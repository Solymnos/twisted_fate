import axios from 'axios';

const SRV_URL = 'http://localhost:8000';

export const apiRegister = async({ username, email, password }) =>
{
    let data =
    {
        username:   username,
        email   :   email,
        password:   password,
    }
    let response = await axios.post(SRV_URL + '/user/register', JSON.stringify(data),
    {
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        }
    });
    return response;
}

export const apiLogin = async({ username , email , password }) =>
{
    let data =
    {
        username : username,
        email : email,
        password : password
    }
    let response = await axios.post(SRV_URL + '/user/login', JSON.stringify(data),
    {
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        }
    });
    return response;
}