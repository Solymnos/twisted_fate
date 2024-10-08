import React , { createContext , useState , useEffect } from 'react';
import { getUserBetsLive , getUserBetsOver , getGlobalBets } from '../hooks/Data';

export const BetsContext = createContext();

export const BetsProvider = ({ children }) =>
{
    const [ userBetsLive , setUserBetsLive ] = useState([]);
    const [ userBetsOver , setUserBetsOver ] = useState([]);
    const [ globalBets , setGlobalBets ] = useState([]);

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
            // TODO : TOAST HERE
            console.log(error);
            setGlobalBets([]);
        }
    }

    const fetchAllBets = async () =>
    {
        await fetchUserBetsLive();
        await fetchUserBetsOver();
        await fetchGlobalBets();
    }

    return (
        <BetsContext.Provider value={{ userBetsLive , fetchUserBetsLive , userBetsOver , fetchUserBetsOver , globalBets , fetchGlobalBets , fetchAllBets }}>
            { children }
        </BetsContext.Provider>
    )
}