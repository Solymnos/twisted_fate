import { apiRegister , apiLogin } from '../services/api';

export const userRegister = async ({username, email, password}) =>
{
    try
    {
        const response = await apiRegister({username : username, email : email, password : password});
        return {success : true, error : null, response : response}
    } catch (error)
    {
        return { success : false, error : error.response.data.detail }
    }
    
}

export const userLogin = async ({ username , email , password }) =>
{
    try
    {
        const response = await apiLogin({ username : username , email : email , password : password });
        return { success : true , error : null , response : response };
    } catch (error)
    {
        return { success : false, error : error.response.data.detail };
    }
}