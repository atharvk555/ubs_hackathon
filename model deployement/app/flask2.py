from flask import Flask, request, jsonify
from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer
import easyocr
import torch
from PIL import Image
import requests
from io import BytesIO
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})
# 🔹 Configure Gemini API
GEMINI_API_KEY = "Your KEY"  # Replace with your actual API key
genai.configure(api_key=GEMINI_API_KEY)
gemini_model = genai.GenerativeModel("gemini-1.5-flash")

# Load OCR Reader
reader = easyocr.Reader(["en"])

# Load Genre Classification Model
MODEL_PATH = "./model deployement/book_genre_classifier"
device = 0 if torch.cuda.is_available() else -1

model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)

classifier = pipeline("zero-shot-classification", model=model, tokenizer=tokenizer, device=device)

# List of Book Genres
GENRE_CATEGORIES = [
    "Art & Photography", "Biography", "Business & Finance", "Children's Books",
    "History", "Medical", "Personal Development", "Religion", "Romance",
    "Science Fiction", "Science", "Sports", "Technology", "Travel & Holiday Guides"
]

@app.route('/predict', methods=['POST'])
def predict_book_genre():
    data = request.json
    image_url = data.get("image_url")

    if not image_url:
        return jsonify({"error": "No image URL provided!"}), 400

    try:
        # Load image from URL
        response = requests.get(image_url)
        image = Image.open(BytesIO(response.content))

        # 🔹 Step 1: Use Gemini to Extract Book Details
        gemini_prompt = [
            "Extract structured details: title, author, and publisher from this book cover image. Give in plain text",
            image
        ]
        gemini_response = gemini_model.generate_content(gemini_prompt)

        # 🔹 Step 2: Convert Gemini Response to JSON Format
        gemini_output = {}
        if gemini_response and hasattr(gemini_response, "text"):
            response_lines = gemini_response.text.split("\n")
            for line in response_lines:
                parts = line.split(":")
                if len(parts) == 2:
                    key, value = parts[0].strip().lower(), parts[1].strip()
                    if "title" in key:
                        gemini_output["title"] = value
                    elif "author" in key:
                        gemini_output["author"] = value
                    elif "publisher" in key:
                        gemini_output["publisher"] = value

        # Provide default values if any field is missing
        title = gemini_output.get("title", "Unknown")
        author = gemini_output.get("author", "Unknown")
        publisher = gemini_output.get("publisher", "Unknown")

        # 🔹 Step 3: Extract Text Using OCR
        extracted_text = " ".join(reader.readtext(image, detail=0))

        if not extracted_text.strip():
            return jsonify({"error": "No readable text found!"}), 400

        # 🔹 Step 4: Predict Genre Using Zero-Shot Classification
        result = classifier(extracted_text, candidate_labels=GENRE_CATEGORIES, multi_label=True)
        predicted_genre = result["labels"][0]

        # 🔹 Step 5: Format JSON Response
        response_data = {
            "title": title,
            "author": author,
            "publisher": publisher,
            "extracted_text": extracted_text,
            "predicted_genre": predicted_genre
        }

        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
