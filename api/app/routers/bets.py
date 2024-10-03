from fastapi import APIRouter, Response, status, Depends, HTTPException

from app.database import Bets, Matches
from .. import oauth2, schemas

router = APIRouter()

@router.post('/')
async def create_update_bet(payload : schemas.Bet, user_id : str = Depends(oauth2.require_verified_user)) :
    bet = Bets.find_one({'userId' : user_id, 'matchId' : payload.matchId, 'betType' : payload.betType })
    bet_data = {
        'userId' : user_id,
        'matchId' : payload.matchId,
        'betType' : payload.betType,
        'predict' : payload.predict,
        'status' : 'LIVE'
    }

    if bet :
        res = Bets.update_one(
            {'userId' : user_id, 'matchId' : payload.matchId, 'betType' : payload.betType }, 
            {
                '$set' : bet_data,
            }
        )
    else :
        result = Bets.insert_one(bet_data)
    user_bets = Bets.find({'userId' : user_id, 'status' : 'LIVE'}, {'_id' : 0})
    BETS = list(user_bets)
    return { 'status' : 'success' , 'bets' : BETS }

@router.post('/cancel')
async def cancel_bet(payload : schemas.BetCancel, user_id : str = Depends(oauth2.require_verified_user)) :
    bet = Bets.find_one({'userId' : user_id, 'matchId' : payload.matchId, 'betType' : payload.betType })
    bet_data = {
        'userId' : user_id,
        'matchId' : payload.matchId,
        'betType' : payload.betType,
        'predict' : '',
        'status' : 'CANCEL'
    }

    if bet : 
        res = Bets.update_one(
            {
                'userId' : user_id, 'matchId' : payload.matchId, 'betType' : payload.betType
            },
            {
                '$set' : bet_data,
            }
        )
    user_bets = Bets.find({'userId' : user_id, 'status' : 'LIVE'}, {'_id' : 0})
    BETS = list(user_bets)
    return { 'status' : 'success' , 'bets' : BETS }

@router.get('/live')
async def get_user_live_bets(user_id : str = Depends(oauth2.require_verified_user)) :
    user_bets = Bets.find({'userId' : user_id, 'status' : 'LIVE'}, {'_id' : 0})
    BETS = list(user_bets)
    return { 'status' : 'success' , 'bets' : BETS }

@router.get('/over')
async def get_user_over_bets(user_id : str = Depends(oauth2.require_verified_user)) :
    user_bets = Bets.find({'userId' : user_id, 'status' : 'OVER'}, {'_id' : 0})
    BETS = list(user_bets)
    return { 'status' : 'success' , 'bets' : BETS }

@router.get('/')
async def get_global_bets_info() :
    bets_data = []
    matches_over = Matches.find({"Status" : "NOT_STARTED"} , { "_id" : 0 })
    for match in matches_over :
        print(match)
        T1Vote = 0
        T2Vote = 0
        match_bets = Bets.find({'matchId' : match['MatchId'], 'status' : 'LIVE'})
        for bet in match_bets : 
            if bet['predict'] == match['Team1'] :
                T1Vote += 1
            if bet['predict'] == match['Team2'] :
                T2Vote += 1
        if (T1Vote + T2Vote > 0) :
            T1Per = T1Vote/(T1Vote + T2Vote) * 100
            T2Per = T2Vote/(T1Vote + T2Vote) * 100
        else :
            T1Per = 0
            T2Per = 0
        bets_data.append({
            'matchId' : match['MatchId'],
            'team1Percentage' : T1Per,
            'team2Percentage' : T2Per,
            'total' : T1Vote + T2Vote
        })
    return { 'status' : 'success' , 'bets_data' : bets_data }