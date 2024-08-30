import React from 'react';
import axios from 'axios';

let API_URL = 'http://localhost:8000/api';

export const apiRegister = async({ username , email , password , confirm_password }) =>
{
    const payload = {
        username : username,
        email : email,
        password : password,
        passwordConfirm : confirm_password
    };

    let response = await axios.post( API_URL + '/auth/register', payload);
    console.log(response.data);
}