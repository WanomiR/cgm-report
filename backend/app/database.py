from motor import motor_asyncio

client = motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017/")

db = client["mongo-dump-2023-10-19"]
collection = db["entries"]
