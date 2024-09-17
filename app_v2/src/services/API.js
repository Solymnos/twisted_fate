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
    return (response);
}

export const apiLogin = async({ username , email , password }) =>
{
    let payload = {};

    if (email == null)
    {
        payload = {
            username : username,
            password : password
        };
    } else if (username == null)
    {
        payload = {
            email : email,
            password : password
        }
    }
    

    let response = await axios.post( API_URL + '/auth/login' , payload , { withCredentials : true });
    return ( response );
}

export const apiMe = async() =>
{
    let response = await axios.get( API_URL + '/users/me' , { withCredentials : true });
    return ( response );
}

export const apiSchedule = async() =>
{
    let response = await axios.get( API_URL + '/data/schedule' );
    return ( response )
}