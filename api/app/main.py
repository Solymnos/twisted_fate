from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
import time

from app.routers import auth, user, data
from app.riotApi import fetch_league_data

app = FastAPI()

def scheduler() :
    scheduler = BackgroundScheduler()
    scheduler.start()
    scheduler.add_job(fetch_league_data, trigger=IntervalTrigger(seconds=60), id='fetch_league_data', name='Fetch LCK data every minutes', replacing_existing=True)

origins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(auth.router, tags=['Auth'], prefix='/api/auth')
app.include_router(user.router, tags=['Users'], prefix='/api/users')
app.include_router(data.router, tags=['Data'], prefix='/api/data')

@app.on_event('startup')
async def startup_event() :
    fetch_league_data()
    scheduler()

@app.get('/api/healthchecker')
def root() :
    return { 'message' : 'Server UP' }