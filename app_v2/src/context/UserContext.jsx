import React , { createContext , useState , useEffect, useContext } from 'react';
import { userGetMe } from '../hooks/User';
import { CookieContext } from './CookieContext';

export const UserContext = createContext();

export const UserProvider = ({ children }) =>
{
    const [ userData , setUserData ] = useState(null);
    const { isLogged } = useContext(CookieContext);

    useEffect(() =>
    {
        const fetchUser = async () =>
        {
            console.log("FETCH USER");
            if (!isLogged)
            {
                setUserData(null);
            } else {
                let { success , error , response } = await userGetMe();
                if  (success)
                {
                    setUserData(response);
                } else {
                    // TODO : MAYBE A TOAST HERE
                    console.log(error);
                    setUserData(null);
                }
            }
        }
        fetchUser();
    }, [ isLogged ])

    return (
        <UserContext.Provider value={{ userData , setUserData }}>
            { children }
        </UserContext.Provider>
    )
}