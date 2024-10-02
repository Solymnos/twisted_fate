from pymongo import mongo_client
import pymongo
from app.config import settings

client = mongo_client.MongoClient(settings.DATABASE_URL, serverSelectionTimeoutMS=5000)

try :
    conn = client.server_info()
    print(f'connected to MongoDB {conn.get("version")}')
except Exception : 
    print('Unable to connect to the MongoDB server')

db = client[settings.MONGO_INIT_DB_DATABASE]

User = db.users
User.create_index([('email', pymongo.ASCENDING)], unique=True)

Matches = db.matches
Matches.create_index([('MatchId')], unique=True)

Bets = db.bets