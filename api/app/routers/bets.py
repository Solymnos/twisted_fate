from fastapi import APIRouter, Response, status, Depends, HTTPException

from app.database import Bets
from .. import oauth2, schemas

router = APIRouter()

@router.post('/')
async def create_update_bet(payload : schemas.Bet, user_id : str = Depends(oauth2.require_verified_user)) :
    bet = Bets.find_one({'userId' : user_id, 'matchId' : payload.matchId, 'betType' : payload.betType })
    bet_data = {
        'userId' : user_id,
        'matchId' : payload.matchId,
        'betType' : payload.betType,
        'predict' : payload.predict
    }

    if bet :
        res = Bets.update_one(
            {'userId' : user_id, 'matchId' : payload.matchId, 'betType' : payload.betType }, 
            {
                '$set' : bet_data
            }
        )
    else :
        result = Bets.insert_one(bet_data)

@router.get('/')
async def get_user_bets(user_id : str = Depends(oauth2.require_verified_user)) :
    user_bets = Bets.find({'userId' : user_id}, {'_id' : 0})
    BETS = list(user_bets)
    return { 'status' : 'success' , 'bets' : BETS }

# TODO :
#   -> Récupérer la liste des matchs qui arrivent
#   -> Pour chaque match (identifier par match id), aller chercher les paris qui correspondent
#       -> Pour chaque paris, si team1, t1vote++, si team2, t2vote++
#       -> Faire un pourcentage entre les deux
#           -> T1Per = T1/(T2+T1) * 100
#           -> T2Per = T2/(T2+T1) * 100
#           /!\ mettre les deux à 0% si les T1 et T2 = 0
#       Créer un data avec les infos suivantes : MatchId, T1%, T2%, Nombre de votes
#   retourner la liste
