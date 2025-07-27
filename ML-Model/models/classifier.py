from transformers import pipeline

classifier = pipeline("zero-shot-classification")

def classify_news(text):
    if not text or not isinstance(text, str) or len(text.strip()) < 30:
        return "unknown"
    
    labels = ["technology", "finance", "food", "sports", "travel"]
    result = classifier(text, candidate_labels=labels)
    return result['labels'][0]
