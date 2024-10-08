import React , { createContext , useState } from 'react';
import Cookies from 'js-cookie';

export const CookieContext = createContext();

export const CookieProvider = ({ children }) => {
    const [ isLogged , setIsLogged ] = useState(() => Cookies.get('logged-in') || false);

    const fetchLogCookie = () =>
    {
        if (Cookies.get('logged_in') === "True")
        {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }

    return (
        <CookieContext.Provider value={{ isLogged , fetchLogCookie }}>
            { children }
        </CookieContext.Provider>
    );
};