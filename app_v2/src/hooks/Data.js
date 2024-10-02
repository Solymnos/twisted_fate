import { apiSchedule , apiOver } from "../services/API";

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
    }
}