import React , { createContext , useState } from 'react';
import { getOver } from '../hooks/Data';

export const OverContext = createContext();

export const OverProvider = ({ children }) =>
{
    const [ overData , setOverData ] = useState( null );

    const fetchOver = async () =>
    {
        const { success , error , response } = await getOver();
        if ( success )
        {
            setOverData( response );
        } else {
            // TODO : MAYBE A TOAST HERE
            console.log( error );
            setOverData( null ); 
        }
    }

    return (
        <OverContext.Provider value={{ overData , fetchOver }}>
            { children }
        </OverContext.Provider>
    )
}