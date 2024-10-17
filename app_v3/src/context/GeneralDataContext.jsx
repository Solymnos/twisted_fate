import React , { createContext , useState } from 'react';
import { getUserRanking } from '../hooks/Data';

export const GeneralDataContext = createContext();

export const GeneralDataProvider = ({ children }) =>
{
    const [ userRanking , setUserRanking ] = useState( [] );
    
    const fetchUserRanking = async () =>
    {
        const { success , error , response} = await getUserRanking();
        if ( success )
        {
            setUserRanking( response );
        } else {
            // TODO : MAYBE A TOAST HERE
            console.log( error );
            setUserRanking ( [] )
        }
    }

    return (
        <GeneralDataContext.Provider value={{ userRanking , fetchUserRanking }}>
            { children }
        </GeneralDataContext.Provider>
    )
}