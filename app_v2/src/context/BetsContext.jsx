import React , { createContext , useState , useEffect } from 'react';
import { getUserBetsLive , getUserBetsOver , getGlobalBets } from '../hooks/Data';

export const BetsContext = createContext();

export const BetsProvider = ({ children }) =>
{
    const [ userBetsLive , setUserBetsLive ] = useState([]);
    const [ userBetsOver , setUserBetsOver ] = useState([]);
    const [ globalBets , setGlobalBets ] = useState([]);

    useEffect(() =>
    {
        const fetchUserBetsLive = async () =>
        {
            const { success , error , response } = await getUserBetsLive();
            if ( success )
            {
                setUserBetsLive(response);
            } else {
                // TODO : TOAST HERE
                console.log(error)
                setUserBetsLive([]);
            }
        }

        const fetchUserBetsOver = async () =>
        {
            const { success , error , response } = await getUserBetsOver();
            if ( success )
            {
                setUserBetsOver(response);
            } else {
                // TODO : TOAST HERE
                console.log(error)
                setUserBetsOver([]);
            }
        }

        const fetchGlobalBets = async () =>
        {
            const { success , error , response } = await getGlobalBets();
            if ( success )
            {
                setGlobalBets(response);
            } else {
                console.log(error);
                setGlobalBets([]);
            }
        }


        fetchUserBetsLive();
        fetchUserBetsOver();
        fetchGlobalBets();
        
    }, []);

    return (
        <BetsContext.Provider value={{ userBetsLive , setUserBetsLive , userBetsOver , setUserBetsOver , globalBets , setGlobalBets }}>
            { children }
        </BetsContext.Provider>
    )
}