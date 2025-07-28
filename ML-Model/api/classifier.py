# api/classifier.py
from fastapi import APIRouter
from pydantic import BaseModel
import joblib
import os

router = APIRouter()

model_path = os.path.join("model", "news_model.joblib")
vectorizer_path = os.path.join("model", "vectorizer.joblib")

# Load model and vectorizer
model = joblib.load(model_path)
vectorizer = joblib.load(vectorizer_path)

class NewsItem(BaseModel):
    title: str

@router.post("/classify")
async def classify_news(news: NewsItem):
    X = vectorizer.transform([news.title])
    prediction = model.predict(X)[0]
    return {"title": news.title, "predicted_category": prediction}
