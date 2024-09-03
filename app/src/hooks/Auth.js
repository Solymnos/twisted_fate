import { apiRegister, apiLogin } from "../services/API";

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
        return { success : false , error : error.response.data.detail , response : null }
    }
}

export const userLogin = async ({ username , email , password }) =>
{
    try {
        let response = await apiLogin({ username : username , email : email , password : password })
        return { success : true , error : null , response : response }
    } catch (error)
    {
        console.log(error);
        if (error.code === 'ERR_NETWORK')
        {
            return { success : false , error : 'Server inactif', response : null }
        }
        return { success : false , error : error.response.data.detail , response : null }
    }
}