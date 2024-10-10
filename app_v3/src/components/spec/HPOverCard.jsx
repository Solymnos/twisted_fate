import React from 'react'
import { Card, CardContent } from '@/components/ui/card';

const getTeamScore = ( teamName , match ) =>
{
    let teamScore = 0;
    
    for ( let  i = 0 ; i < match.games.length ; i++ )
    {
        if (match.games[i].WinTeam == teamName)
        {
            teamScore++;
        }
    }
    return teamScore;
}

const HPOverCard = ({ match }) => 
{
    let team1Score = getTeamScore( match.Team1 , match );
    let team2Score = getTeamScore( match.Team2 , match );

    return (
        <div className='p-2 box-border'>
            <Card className='bg-card rounded-3xl h-48 box-border'>
                <CardContent className='flex p-4 flex-row h-full'>
                    <div className='flex flex-col w-1/3 justify-evenly items-center text-center'>
                        <img className='max-w-24 max-h-24' src={match.Team1ImageUrl} />
                        <h2 className='font-sans font-bold text-3xl'>{match.Team1Short}</h2>
                    </div>
                    
                    {
                        team1Score > team2Score ? (
                            <div className='flex flex-row w-1/3 justify-center items-center gap-8'>
                                <div className='bg-hl w-20 h-20 flex justify-center items-center font-sans font-bold rounded-xl text-2xl'>{team1Score}</div>
                                <div className='bg-card border-2 border-hl w-20 h-20 flex justify-center items-center font-sans font-bold rounded-xl text-2xl'>{team2Score}</div>
                            </div>
                        ) : (
                            <div className='flex flex-row w-1/3 justify-center items-center gap-8'>
                                <div className='bg-card border-2 border-hl w-20 h-20 flex justify-center items-center font-sans font-bold rounded-xl text-2xl'>{team1Score}</div>
                                <div className='bg-hl  w-20 h-20 flex justify-center items-center font-sans font-bold rounded-xl text-2xl'>{team2Score}</div>
                            </div>
                        )
                    }
                    <div className='flex flex-col w-1/3 justify-evenly items-center text-center'>
                        <img className='max-w-24 max-h-24' src={match.Team2ImageUrl} />
                        <h2 className='font-sans font-bold text-3xl'>{match.Team2Short}</h2>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default HPOverCard