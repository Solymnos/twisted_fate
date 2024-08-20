from motor.motor_asyncio    import AsyncIOMotorClient
from pymongo.errors         import OperationFailure

MONGO_DB_URL    =   "mongodb+srv://Solymnos:1ncubus0Wmongodb@sly-api-db.rdzdzn5.mongodb.net/twisted_fate"

users   =   None

async def connexion_to_database() :
    global users
    try :
        client = AsyncIOMotorClient(MONGO_DB_URL)
        database = client.get_database("twisted_fate")
        users = database.get_collection("users")
    except OperationFailure as e :
        print(f'MongoDB Error : {e}')
    except Exception as e:
        print(f'Unexpected error : {str(e)}')

def get_users():
    return users