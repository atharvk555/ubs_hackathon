from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer
import torch

MODEL_NAME = "facebook/bart-large-mnli"
MODEL_PATH = "./book_genre_classifier"

# Check if model exists, else download and save
if torch.cuda.is_available():
    device = 0  # Use GPU if available
else:
    device = -1  # Use CPU

try:
    classifier = pipeline("zero-shot-classification", model=MODEL_PATH, device=device)
    print("✅ Loaded saved model!")
except:
    print("🚀 Downloading model...")
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

    # Save model & tokenizer
    model.save_pretrained(MODEL_PATH)
    tokenizer.save_pretrained(MODEL_PATH)

    classifier = pipeline("zero-shot-classification", model=model, tokenizer=tokenizer, device=device)
    print("✅ Model saved locally!")