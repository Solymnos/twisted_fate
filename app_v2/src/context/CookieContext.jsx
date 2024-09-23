import React , { createContext , useState , useEffect } from 'react';
import Cookies from 'js-cookie';

export const CookieContext = createContext();

export const CookieProvider = ({ children }) => {
    const [ isLogged , setIsLogged ] = useState(() => Cookies.get('logged-in') || false);

    useEffect(() =>
    {
        const cookie = Cookies.get('logged_in');
        if (cookie)
        {
            setIsLogged(cookie);
        }
    }, [])

    const updateLoggedCookie = () =>
    {
        if (Cookies.get('logged_in') === "True")
        {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }

    return (
        <CookieContext.Provider value={{ isLogged , setIsLogged, updateLoggedCookie }}>
            { children }
        </CookieContext.Provider>
    );
};