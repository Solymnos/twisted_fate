import { apiRegister } from "../services/API";

export const userRegister = async ({ username , email , password , confirm_password }) =>
{
    try {
        let response = await apiRegister({ username : username , email : email , password : password , confirm_password : confirm_password });
        return { success : true , error : null , response : response }
    } catch (error) 
    {
        if (error.code === 'ERR_NETWORK')
        {
            return { success : false , error : 'Serveur inactif' , response : null }
        }
        console.log(error);
        return { success : false , error : error.response.data.detail , response : null }
    }
}