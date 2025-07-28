Full Stack ML-Powered News Website
🧠 Goal

Build a full-stack news platform that fetches, summarizes, and categorizes news articles using machine learning (ML) and displays them on a modern frontend.
🏗️ 1. Architecture Overview

[News Sources] --> [Backend Scraper/API Fetcher] --> [ML Models] --> [Database]
                                                                   ↓
                                                           [React Frontend UI]

🔧 2. Tech Stack Breakdown
Layer	Tools Used
Frontend	React.js or Next.js
Backend	Node.js + Express or Python (FastAPI / Flask)
ML/NLP	HuggingFace Transformers, T5/BART for summaries
Database	MongoDB or PostgreSQL
Deployment	Render, Vercel, Railway, or AWS (for APIs)
⚙️ 3. Core Functionalities
✅ A. News Fetching

    Use RSS feeds, NewsAPI, or newspaper3k

    Store raw articles in DB

✅ B. ML/NLP Processing

    Summarization: BART or T5

    Categorization: Fine-tuned BERT or keyword-based

    NER & Tagging: spaCy / Transformers

    Sentiment (Optional): Use Vader or BERT sentiment models

✅ C. API Endpoints

Example endpoints:

    GET /news – Fetch summarized news

    POST /process – Trigger ML pipeline

    GET /categories – Filter by category

✅ D. Frontend Display

    News cards (headline, summary, tags)

    Filters (category, date)

    Search bar

    Optional: Trending, most-read, or “AI Picks”

🗃️ 4. Database Schema (MongoDB Example)

{
  "title": "Original headline",
  "content": "Full news article",
  "summary": "ML-generated summary",
  "category": "Technology",
  "tags": ["AI", "OpenAI"],
  "source": "Times of India",
  "published_at": "2025-07-24T08:00:00Z"
}

🧪 5. ML Pipeline (Server-Side)

from transformers import pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def summarize_article(text):
    return summarizer(text, max_length=130, min_length=30, do_sample=False)[0]['summary_text']

You can also:

    Use custom-trained models

    Deploy models using Hugging Face Inference API or FastAPI + ONNX

🚀 6. Optional Advanced Features

    🔍 Personalized feed with user history

    🗣️ Voice-to-text or text-to-voice for accessibility

    📊 Analytics dashboard for admin

    ✍️ AI-generated news insights or trending summaries

📦 7. Deployment Options

    Frontend: Vercel / Netlify

    Backend + ML API: Render / Railway / AWS

    Database: MongoDB Atlas or ElephantSQL (PostgreSQL)

✅ Final Summary
Feature	Description
🔄 News Fetching	Automatically gets fresh news via APIs or scraping
🧠 ML Processing	Summarizes, categorizes, tags using ML/NLP models
🖥️ Frontend	React-based UI to show summarized, filtered news
🗃️ Storage	Stores articles in a NoSQL/SQL database
🚀 Bonus	Optional voice, search, and personalization features


# Pavan-Insight-Global News Platform

A modern, AI-powered news aggregation platform built with React, Express.js, and MongoDB. Features intelligent news scraping, ML-based categorization, and real-time updates.

## 🚀 Features

### Core Platform
- **Modern UI**: Glassmorphism design with responsive layout
- **6 News Categories**: Technology, Lifestyle, Sports, Fitness, Food, Travel
- **Real-time Updates**: News automatically scraped every 5 hours
- **Smart Search**: Full-text search across all articles
- **Featured & Trending**: Curated content highlighting

### AI/ML Capabilities
- **Intelligent Categorization**: ML-powered article classification
- **Content Quality Filtering**: Sentiment analysis and spam detection
- **Auto-generated Excerpts**: Smart content summarization
- **Reading Time Estimation**: Accurate time calculations
- **Duplicate Detection**: Prevents redundant content

### Technical Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **Database**: MongoDB (with fallback to in-memory storage)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query
- **ML Libraries**: Natural Language Processing, Sentiment Analysis

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- MongoDB instance (local or cloud)
- Internet connection for news scraping

### Environment Setup
```bash
# Optional: Enable MongoDB storage
export USE_MONGODB=true
export MONGODB_URI="mongodb://localhost:27017/pavan-insight-global"

# For production
export NODE_ENV=production
```

### Installation
```bash
npm install
npm run dev
```

The application will start on port 5000 with both frontend and backend running.

## 🔧 Admin Dashboard

Access the admin panel at `/admin` to:
- **Manual Scraping**: Trigger immediate news updates
- **Database Stats**: View article distribution and analytics  
- **System Status**: Monitor scraping scheduler health
- **Cleanup Tools**: Remove old articles (30+ days)

## 📊 News Sources

The platform scrapes from multiple trusted sources:
- **TechCrunch**: Technology and startup news
- **BBC News**: Global news and current events
- **Reuters**: Business and world news
- **RSS Feeds**: Various category-specific sources

## 🤖 ML Classification System

### Category Classification
Uses keyword matching and stemming algorithms to categorize articles:
- **Technology**: AI, blockchain, software, mobile apps
- **Lifestyle**: Home design, wellness, relationships
- **Sports**: Football, basketball, Olympics, tournaments
- **Fitness**: Workouts, nutrition, health, yoga
- **Food**: Recipes, restaurants, cooking, nutrition
- **Travel**: Destinations, hotels, adventures, culture

### Content Processing
- **Quality Filtering**: Removes spam and low-quality content
- **Sentiment Analysis**: Filters extremely negative content
- **Length Validation**: Ensures substantial article content
- **Image Processing**: Handles image URLs and fallbacks

## 🗂️ Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and API client
├── server/                # Express backend
│   ├── ml/               # Machine learning modules
│   ├── scrapers/         # News scraping logic
│   ├── database/         # MongoDB integration
│   ├── scheduler/        # Cron job management
│   └── routes.ts         # API endpoints
├── shared/               # Shared TypeScript types
└── README.md
```

## 🔄 Automatic News Updates

The system automatically:
1. **Scrapes news** from multiple sources every 5 hours
2. **Classifies articles** using ML algorithms
3. **Filters content** for quality and relevance
4. **Stores in MongoDB** with full indexing
5. **Updates featured articles** based on recency and engagement
6. **Cleans old content** to maintain database performance

## 🚀 Deployment

The platform is optimized for deployment on:
- **Replit**: Ready-to-deploy configuration
- **Railway**: MongoDB Atlas integration
- **Vercel/Netlify**: Static frontend with serverless functions
- **DigitalOcean**: Full-stack deployment

## 📈 Performance Features

- **Hybrid Storage**: MongoDB with memory fallback
- **Intelligent Caching**: Query optimization and indexing
- **Lazy Loading**: Progressive content loading
- **Image Optimization**: Responsive image handling
- **Error Recovery**: Graceful fallbacks for all services

## 🔒 Production Considerations

- Set `NODE_ENV=production` for optimized builds
- Configure MongoDB connection string
- Enable CORS for your domain
- Set up monitoring for scraping failures
- Configure backup strategies for article data

---

Built with ❤️ for modern news consumption and real-time information delivery.
