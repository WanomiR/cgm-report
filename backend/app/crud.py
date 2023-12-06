from database import collection


async def fetch_entries():

    entries = []
    cursor = collection.find({})
    async for doc in cursor:
        entries.append(doc)

    return entries


