from transformers import pipeline

classifier = pipeline("zero-shot-classification")

def classify_news(text):
    labels = ["politics", "sports", "entertainment", "technology", "business"]
    result = classifier(text, candidate_labels=labels)
    return result['labels'][0]
