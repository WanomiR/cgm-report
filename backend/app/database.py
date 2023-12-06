import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017/")

db = client["mongo-dump-2023-10-19"]
collection = db["entries"]
