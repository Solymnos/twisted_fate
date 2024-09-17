import { apiMe } from "../services/API";

export const userGetMe = async () =>
{
    try {
        let response = await apiMe();
        return { success : true , error : null, response : response.data.user }
    } catch ( error )
    {
        if (error.code === 'ERR_NETWORK')
        {
            return { success : false , error : 'Serveur inactif' , response : null }
        }
    }
}