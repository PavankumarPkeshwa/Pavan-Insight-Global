from transformers import pipeline

ner_model = pipeline("ner", grouped_entities=True)

def extract_entities(text):
    return ner_model(text)
