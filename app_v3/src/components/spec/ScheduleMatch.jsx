import React, { useContext } from 'react';
import { BetsContext } from '../../context/BetsContext';
import { updateBet , cancelBet } from '../../hooks/Data';

const ScheduleMatch = ({ match }) => {


    const { userBetsLive , setUserBetsLive , globalBets , setGlobalBets } = useContext(BetsContext);

    const betExisting = ( matchId ) =>
    {
        for (let i = 0 ; i < userBetsLive.length ; i++)
        {
            if (userBetsLive[i].matchId === matchId && userBetsLive[i].betType === 'WINNER')
            {
                return userBetsLive[i].predict
            }
        }
        return null;
    }

    const getMatchBetsData = (matchId) =>
    {

        if (!globalBets)
        {
            return {
                matchId : matchId,
                team1Percentage : 0,
                team2Percentage : 0,
                total : 0
            }
        }

        for (let i = 0; i < globalBets.length; i++)
        {
            if (globalBets[i].matchId == matchId)
            {
                return globalBets[i]
            }
        }
        return {
            matchId : matchId,
            team1Percentage : 0,
            team2Percentage : 0,
            total : 0
        }
    }

    const handleUpdate = async (matchId , betType , predict) =>
    {
        let { success , error , response } = await updateBet({ matchId : matchId , betType : betType , predict : predict });
        if (success)
        {
            setUserBetsLive(response);
        }
    }

    const handleCancel = async (matchId, betType) =>
    {
        let { success , error , response } = await cancelBet({ matchId : matchId , betType : betType })
        if (success)
        {
            setUserBetsLive(response);
        }
    }

    let predict = betExisting(match.MatchId);
    let match_bets_data = getMatchBetsData(match.MatchId);

    return (
        <div className='flex flex-row'>
              <div className='rotate-180 bg-mDark text-mPurple text-center text-3xl font-black' style={{ writingMode: 'vertical-rl'}}>
                {match_bets_data.team1Percentage}%
            </div>
            <div className='flex-1'>
                <div className='flex flex-row justify-between'>
                    <h1 className='text-mPurple font-bold'>{match.ShownName}</h1>
                    <h1 className='text-mPurple font-bold'>{match.Date}</h1>
                    <h1 className='text-mPurple font-bold'>{match_bets_data.total} vote(s)</h1>
                </div>
                <div className='border-mPurple border-2 rounded-3xl flex-1 flex flex-row'>
                    {
                        predict == match.Team1 ? (
                            <div onClick={async () => await handleCancel(match.MatchId, 'WINNER')} className='w-1/2 flex flex-row justify-between items-center p-4 bg-mPurple rounded-2xl cursor-pointer'>
                                <img className='max-h-12 max-w-12' src={match.Team1ImageUrl} />
                                <h1 className='text-mWhite font-bold text-2xl'>{match.Team1}</h1>
                            </div>
                        ) : (
                            <div onClick={async () => await handleUpdate(match.MatchId, 'WINNER', match.Team1)} className='w-1/2 flex flex-row justify-between items-center p-4 rounded-2xl cursor-pointer'>
                                <img className='max-h-12 max-w-12' src={match.Team1ImageUrl} />
                                <h1 className='text-mWhite font-bold text-2xl'>{match.Team1}</h1>
                            </div>
                        )
                    }
                    {
                        predict == match.Team2 ? (
                            <div onClick={async () => await handleCancel(match.MatchId, 'WINNER')} className='w-1/2 flex flex-row justify-between items-center p-4 rounded-2xl bg-mPurple cursor-pointer'>
                                <h1 className='text-mWhite font-bold text-2xl'>{match.Team2}</h1>
                                <img className='max-h-12 max-w-12' src={match.Team2ImageUrl} />
                            </div>
                        ) : (
                            <div onClick={async () => await handleUpdate(match.MatchId, 'WINNER', match.Team2)} className='w-1/2 flex flex-row justify-between items-center p-4 rounded-2xl cursor-pointer'>
                                <h1 className='text-mWhite font-bold text-2xl'>{match.Team2}</h1>
                                <img className='max-h-12 max-w-12' src={match.Team2ImageUrl} />
                            </div>
                        )
                    }
                    
                </div>
            </div>
            <div className='rotate-270 bg-mDark text-mPurple text-center text-3xl font-black' style={{ writingMode: 'vertical-rl'}}>
                {match_bets_data.team2Percentage}%
            </div>
        </div>
    )
}

export default ScheduleMatch