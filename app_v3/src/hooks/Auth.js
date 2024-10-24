import { apiRegister, apiLogin , apiLogout , apiRequestMailValidation } from "../services/API";

export const userRegister = async ({ username , email , password , confirm_password }) =>
{
    try {
        let response = await apiRegister({ username : username , email : email , password : password , confirm_password : confirm_password });
        return { success : true , error : null , response : response }
    } catch ( error ) 
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
    } catch ( error )
    {
        console.log("ERROR")
        console.log(error);
        //if (error.code === 'ERR_NETWORK')
        //{
        //    return { success : false , error : 'Server inactif', response : null }
        //}
        return { success : false , error : error.response.data.detail , response : null }
    }
}

export const userLogout = async () =>
{
    try {
        let response = await apiLogout()
        return { success : true , error : null , response : response }
    } catch (error)
    {
        console.log(error);
        if (error.code === 'ERR_NETWORK')
        {
            return { success : false , error : 'Serveur inactif', response : null }
        }
        return { success : false , error : error.response.data.detail , response : null }
    }
}

export const requestMailValidation = async () =>
{
    try {
        let response = await apiRequestMailValidation()
        return { success : true , error : null , response : response }
    } catch (error)
    {
        return { success : false , error : error.response.data.detail , response : null }
    }
}