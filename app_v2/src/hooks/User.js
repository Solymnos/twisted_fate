import { apiMe } from "../services/API";

export const userGetMe = async () =>
{
    try {
        console.log('USER GET ME')
        let response = await apiMe();
        console.log(response.data.user)
        return { success : true , error : null, response : response.data.user }
    } catch ( error )
    {
        if (error.code === 'ERR_NETWORK')
        {
            return { success : false , error : 'Serveur inactif' , response : null }
        }
    }
}