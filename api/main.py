from fastapi                    import FastAPI
from contextlib                 import asynccontextmanager
from database                   import connexion_to_database
from fastapi.middleware.cors    import CORSMiddleware
from routes                     import router
@asynccontextmanager
async def lifespan(app : FastAPI) :
    await connexion_to_database()
    yield
    print('Lifespan end')

app = FastAPI(lifespan=lifespan)

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(router)

