import React , { createContext , useState , useEffect } from 'react';
import { getOver } from '../hooks/Data';

export const OverContext = createContext();

export const OverProvider = ({ children }) =>
{
    const [ overData , setOverData ] = useState(null);

    useEffect(() =>
    {
        const fetchOver = async () =>
        {
            const { success , error , response } = await getOver();
            console.log("FETCHING OVER")
            console.log(response)
            if ( success )
            {
                setOverData(response);
            } else {
                console.log(error);
                setOverData(null);
            }
        }
        fetchOver();
    }, []);

    return (
        <OverContext.Provider value={{ overData , setOverData }}>
            { children }
        </OverContext.Provider>
    )
}