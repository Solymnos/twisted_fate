import React , { useContext , useEffect , useState } from 'react';
import { OverContext } from '../../context/OverContext';

const HomePageOver = () =>
{
    const { overData } = useContext(OverContext);


    const parseOverData = (incData) =>
    {
        let parsedOverData = [];

        if (incData == null)
        {
            return parsedOverData;
        }

        for (let i = 0; i < incData.length; i++)
        {
            let match = incData[i];
            let T1Score = 0;
            let T2Score = 0;

            for (let j = 0; j < match.games.length; j++)
            {
                if (match.games[j].WinTeam == match.Team1)
                {
                    T1Score++;
                } else {
                    T2Score++;
                }
            }
            
            
            let matchData = {
                'Team1' : match.Team1Short,
                'Team2' : match.Team2Short,
                'Team1ImageUrl' : match.Team1ImageUrl,
                'Team2ImageUrl' : match.Team2ImageUrl,
                'Team1Score' : T1Score,
                'Team2Score' : T2Score
            }

            parsedOverData.push(matchData);
        }
        return parsedOverData;
    }

    let parsedOverData = parseOverData(overData);

    return (
        <div className='w-1/4 p-5'>
            <div className='w-full rounded-3xl p-5'>
                <h1 className='text-mWhite text-3xl font-bold mb-4'>Matchs terminés</h1>
                <div className='flex flex-col gap-2'>
                {
                    parsedOverData.map(match =>(
                        <div className='w-full flex flex-row justify-between items-center'>
                            <div className='flex items-center flex-1 justify-between'>
                                <img className='max-h-8 max-w-8' src={match.Team1ImageUrl} />
                                <h1 className='text-xl font-bold text-mWhite'>{match.Team1}</h1>
                            </div>
                            
                            {
                                match.Team1Score > match.Team2Score ? (
                                    <div className='flex-1 flex flex-row gap-2 rounded-md text-center content-center min-h-8 justify-center'>
                                        <div className='bg-mPurple min-w-8 rounded-md text-center content-center'>
                                            <h1 className='text-mDark font-bold'>{match.Team1Score}</h1>
                                        </div>
                                        <div className='bg-mWhite min-w-8  rounded-md text-center content-center'>
                                            <h1 className='text-mDark font-bold'>{match.Team2Score}</h1>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex-1 flex flex-row gap-2  rounded-md text-center content-center min-h-8 justify-center'>
                                        <div className='bg-mWhite min-w-8  rounded-md text-center content-center'>
                                            <h1 className='text-mDark font-bold'>{match.Team1Score}</h1>
                                        </div>
                                        <div className='bg-mPurple min-w-8 rounded-md text-center content-center'>
                                            <h1 className='text-mDark font-bold'>{match.Team2Score}</h1>
                                        </div>
                                    </div>
                                )
                            }
                            <div className='flex items-center flex-1 justify-between'>
                                <h1 className='text-xl font-bold text-mWhite'>{match.Team2}</h1>
                                <img className='max-h-8 max-w-8' src={match.Team2ImageUrl} />
                            </div>
                        </div>

                        //<h1>{match.Team1} - {match.Team2}</h1>
                    ))
                }
            </div>
            </div>
        </div>
    )
}

export default HomePageOver