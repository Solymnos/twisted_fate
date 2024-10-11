import React, { useContext } from 'react'
import { BetsContext } from '@/context/BetsContext';
import { updateBet , cancelBet } from '@/hooks/Data';

const BMatchCard = ({ match }) => 
{
    const { userBetsLive , fetchUserBetsLive , globalBets , fetchGlobalBets } = useContext(BetsContext);
    
    const betExisting = ( matchId ) =>
    {
        for (let i = 0 ;  i < userBetsLive.length ; i++)
        {
            if (userBetsLive[i].matchId === matchId && userBetsLive[i].betType === 'WINNER')
            {
                return userBetsLive[i].predict;
            }
        }
        return null;
    }

    const getMatchBetsData = ( matchId ) =>
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

        for (let i = 0 ; i < globalBets.length ; i++)
        {
            if (globalBets[i].matchId === matchId)
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

    const handleUpdate = async (matchId, betType, predict) =>
    {
        let { success , error , response } = await updateBet({ matchId : matchId , betType : betType , predict : predict});
        if (success)
        {
            await fetchUserBetsLive();
            await fetchGlobalBets();
        }
    }

    const handleCancel = async (matchId, betType) =>
    {
        let { success , error , response } = await cancelBet({ matchId : matchId , betType : betType });
        if ( success )
        {
            await fetchUserBetsLive();
            await fetchGlobalBets()
        }
    }

    let predict = betExisting(match.MatchId);
    let matchBetsData = getMatchBetsData(match.MatchId);

    return (
        <div className='w-full md:w-1/2 p-4 flex flex-row'>
            {
                matchBetsData.team1Percentage > matchBetsData.team2Percentage ? (
                    <div className='text-hl rotate-180 text-3xl text-center font-bold font-sans' style={{ writingMode : 'vertical-rl'}}>
                        {matchBetsData.team1Percentage}%
                    </div>
                ) : (
                    <div className='text-ltext rotate-180 text-3xl text-center font-bold font-sans' style={{ writingMode : 'vertical-rl'}}>
                        {matchBetsData.team1Percentage}%
                    </div>
                )
            }
            <div className='flex-1'>
                <div className='flex flex-row justify-between'>
                    <h1 className='text-ltext font-bold font-sans text-sm'>{match.ShownName}</h1>
                    <h1 className='text-ltext font-bold font-sans text-sm'>{match.DateTime}</h1>
                    <h1 className='text-ltext font-bold font-sans text-sm'>{matchBetsData.total} vote(s)</h1>
                </div>
                <div className='bg-card rounded-2xl flex-1 flex flex-row min-h-24 border-4 border-hl'>
                    {
                        predict == match.Team1 ? (
                            <div onClick={ async () => await handleCancel(match.MatchId, 'WINNER')} className='w-1/2 flex flex-row justify-between items-center p-4 bg-hl rounded-xl cursor-pointer'>
                                <img className='max-h-12 max-w-12' src={match.Team1ImageUrl} />
                                <h1 className='text-dtext font-bold text-2xl'>{match.Team1}</h1>
                            </div>
                        ) : (
                            <div onClick={ async () => await handleUpdate(match.MatchId, 'WINNER', match.Team1)} className='w-1/2 flex flex-row justify-between items-center p-4 cursor-pointer rounded-xl bg-card'>
                                <img className='max-h-12 max-w-12' src={match.Team1ImageUrl} />
                                <h1 className='text-dtext font-bold text-2xl'>{match.Team1}</h1>
                            </div>
                        )
                    }
                    {
                        predict == match.Team2 ? (
                            <div onClick={ async () => await handleCancel(match.MatchId, 'WINNER')} className='w-1/2 flex flex-row justify-between items-center p-4 bg-hl rounded-xl cursor-pointer'>
                                <h1 className='text-dtext font-bold text-2xl'>{match.Team2}</h1>
                                <img className='max-h-12 max-w-12' src={match.Team2ImageUrl} />
                            </div>
                        ) : (
                            <div onClick={ async () => await handleUpdate(match.MatchId, 'WINNER', match.Team2)} className='w-1/2 flex flex-row justify-between items-center p-4  rounded-2xl cursor-pointer'>
                                <h1 className='text-dtext font-bold text-2xl'>{match.Team2}</h1>
                                <img className='max-h-12 max-w-12' src={match.Team2ImageUrl} />
                            </div>
                        )
                    }
                </div>
            </div>
            {
                matchBetsData.team2Percentage > matchBetsData.team1Percentage ? (
                    <div className='text-hl rotate-270 text-3xl text-center font-bold font-sans' style={{ writingMode : 'vertical-rl'}}>
                        {matchBetsData.team2Percentage}%
                    </div>
                ) : (
                    <div className='text-ltext rotate-270 text-3xl text-center font-bold font-sans' style={{ writingMode : 'vertical-rl'}}>
                        {matchBetsData.team2Percentage}%
                    </div>
                )
            }
        </div>
    )
}

export default BMatchCard