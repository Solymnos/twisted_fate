import { apiSchedule , apiOver , apiUserBetsLive , apiUserBetsOver , apiGlobalBets, apiUpdateBet, apiCancelBet , apiGetUserRanking } from "../services/API";

export const getSchedule = async () =>
{
    try {
        let response = await apiSchedule();
        return { success : true , error : null , response : response.data.schedule }
    } catch ( error )
    {
        if (error.code === 'ERR_NETWORK')
        {
            return { success : false , error : 'Serveur inactif', response : null }
        }
        return { success : false , error : error , response : null }
    }
}

export const getOver = async () =>
{
    try {
        let response = await apiOver();
        return { success : true , error : null , response : response.data.over }
    } catch ( error )
    {
        if (error.code === 'ERR_NETWORK')
        {
            return { success : false , error : 'Serveur inactif' , response : null }
        }
        return { success : false , error : error , response : null }
    }
}

export const getUserBetsLive = async () =>
{
    try {
        let response = await apiUserBetsLive();
        return { success : true , error : null , response : response.data.bets }
    } catch ( error )
    {
        return { success : false , error : error , response : null }
    }
}

export const getUserBetsOver = async () =>
{
    try {
        let response = await apiUserBetsOver();
        return { success :  true , error : null , response : response.data.bets }
    } catch ( error )
    {
        return { succes : false , error : error , response : null}
    }
}

export const getGlobalBets = async () =>
{
    try {
        let response = await apiGlobalBets();
        return { success : true , error : null , response : response.data.bets_data }
    } catch ( error )
    {
        return { success : false , error : error , response : null }
    }
}

export const updateBet = async ({ matchId , betType , predict }) =>
{
    try {
        let response = await apiUpdateBet({ matchId : matchId , betType : betType ,  predict : predict});
        return { success : true , error : null , response : response.data.bets }
    } catch ( error )
    {
        return { success : false , error : error , response : null } 
    }
}

export const cancelBet = async ({ matchId , betType }) =>
{
    try {
        let response = await apiCancelBet({ matchId : matchId , betType : betType })
        return { success : true , error : null , response : response.data.bets }
    } catch ( error )
    {
        return { success : false , error : error , response : null }
    }
}

export const getUserRanking = async () =>
{
    try {
        let response = await apiGetUserRanking();
        return { success : true , error : null , response : response.data.data }
    } catch ( error )
    {
        return { success : false , error :  error , response : null }
    }
}