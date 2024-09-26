from fastapi import APIRouter, Response, status, Depends, HTTPException

from app import riotApi
from app.database import Matches

router = APIRouter()

@router.get('/schedule')
async def get_schedule() :
    matches_not_started = Matches.find({"Status" : "NOT_STARTED"}, {"_id" : 0})
    SCHEDULE = list(matches_not_started)
    return { 'status' : 'success' , 'schedule' : SCHEDULE }