from fastapi import APIRouter, Response, status, Depends, HTTPException

from app import riotApi
from app.database import Matches, User

router = APIRouter()

@router.get('/schedule')
async def get_schedule() :
    matches_not_started = Matches.find({"Status" : "NOT_STARTED"}, {"_id" : 0})
    SCHEDULE = list(matches_not_started)
    return { 'status' : 'success' , 'schedule' : SCHEDULE }


@router.get('/over')
async def get_over() :
    matches_over = Matches.find({"Status" : "OVER"}, {"_id" : 0})
    OVER = list(matches_over)
    return { 'status' : 'success' , 'over' : OVER }

@router.get('/user_rank')
async def get_player_ranking() :
    users_data = User.find({}, {"username": 1, "pp": 1, "bets": 1, "_id": 0})
    DATA = list(users_data)
    return { 'status' : 'success' , 'data' : DATA }