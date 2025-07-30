from pymongo import MongoClient

# Replace with your actual MongoDB URI
MONGO_URI = "mongodb+srv://cluster0.rfawquf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["PavanInsightGlobal"]  # Database name
collection = db["articles"]  # Collection name
