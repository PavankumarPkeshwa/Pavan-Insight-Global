# from flask import Flask, request, jsonify
# from models.summarizer import summarize_text
# from models.classifier import classify_news
# from models.ner import extract_entities
# from utils.preprocess import clean_text

# app = Flask(__name__)

# @app.route('/summarize', methods=['POST'])
# def summarize():
#     data = request.json
#     text = clean_text(data.get('text', ''))
#     summary = summarize_text(text)
#     return jsonify({'summary': summary})

# @app.route('/classify', methods=['POST'])
# def classify():
#     data = request.json
#     text = clean_text(data.get('text', ''))
#     category = classify_news(text)
#     return jsonify({'category': category})

# @app.route('/ner', methods=['POST'])
# def named_entity_recognition():
#     data = request.json
#     text = clean_text(data.get('text', ''))
#     entities = extract_entities(text)
#     return jsonify({'entities': entities})

# if __name__ == '__main__':
#     app.run(debug=True)
from utils.scraper import fetch_google_news_rss

if __name__ == "__main__":
    news = fetch_google_news_rss("technology")
    for n in news:
        print("\n📰", n["title"])
        print(n["text"][:300], "...\n")
