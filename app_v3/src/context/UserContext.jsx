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
        const updateUser = async () =>
        {
            await fetchUser();
        }
        updateUser();
    }, [isLogged])

    const fetchUser = async () =>
    {
        let { success , error , response } = await userGetMe();
        if ( success )
        {
            setUserData( response );
        } else {
            // TODO : MAYBE A TOAST HERE
            setUserData( null );
        }
    }

    return (
        <UserContext.Provider value={{ userData , fetchUser }}>
            { children }
        </UserContext.Provider>
    )
}