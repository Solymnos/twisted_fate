import React , { createContext , useState } from 'react';
import { userGetMe } from '../hooks/User';

export const UserContext = createContext();

export const UserProvider = ({ children }) =>
{
    const [ userData , setUserData ] = useState(null);

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