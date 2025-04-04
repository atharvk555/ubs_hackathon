from flask import Flask, request, jsonify
from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer
import easyocr
import torch
from PIL import Image
import requests
from io import BytesIO

app = Flask(__name__)

# Load OCR Reader (Only once)
reader = easyocr.Reader(["en"])

# Load saved model
MODEL_PATH = "./model deployement/book_genre_classifier"
device = 0 if torch.cuda.is_available() else -1

model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)

classifier = pipeline("zero-shot-classification", model=model, tokenizer=tokenizer, device=device)

# 📌 List of Genres
GENRE_CATEGORIES = [
    "Art & Photography", "Biography", "Business & Finance", "Children's Books",
    "History", "Medical", "Personal Development",
    "Religion", "Romance", "Science Fiction", "Science", "Sports", "Technology", "Travel & Holiday Guides"
]

@app.route('/predict', methods=['POST'])
def predict_book_genre():
    data = request.json
    image_url = data.get("image_url")

    if not image_url:
        return jsonify({"error": "No image URL provided!"}), 400

    # Load image from URL
    response = requests.get(image_url)
    image = Image.open(BytesIO(response.content))

    # OCR: Extract text
    extracted_text = " ".join(reader.readtext(image, detail=0))

    if not extracted_text.strip():
        return jsonify({"error": "No readable text found!"}), 400

    # Predict Genre
    result = classifier(extracted_text, candidate_labels=GENRE_CATEGORIES, multi_label=True)
    predicted_genre = result["labels"][0]

    return jsonify({"predicted_genre": predicted_genre, "extracted_text": extracted_text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)