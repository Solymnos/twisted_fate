from fastapi import APIRouter, Response, status, Depends, HTTPException

from app import riotApi

router = APIRouter()

@router.get('/schedule')
async def get_schedule() :
    SCHEDULE = riotApi.get_schedule()
    print("**SCHEDULE**")
    print(SCHEDULE)
    return { 'status' : 'success' , 'schedule' : SCHEDULE }