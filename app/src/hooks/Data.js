import { apiSchedule } from "../services/API";

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