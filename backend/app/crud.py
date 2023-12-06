from database import collection


def fetch_entries():

    entries = []
    for doc in collection.find({}):
        entries.append(doc)

    return entries


