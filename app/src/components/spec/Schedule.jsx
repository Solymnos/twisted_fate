import React from 'react'
import { parseDateTime } from '../../utils/DateUtils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"

const getMatches = ({ schedule }) =>
{
    let matches = [];
    for (const tournament of schedule)
    {
        matches.push(...tournament.Matches)
    }
    matches.sort((a, b) => parseDateTime(a.Date) - parseDateTime(b.Date) )
    return(matches);
}

const Schedule = ({ schedule }) => 
{
    let matches = getMatches( schedule={schedule} );

    return (
    <div>
        <h1 className='ml-5 mt-5'>Prochains Matchs</h1>
        {
            matches.map((match) => (
                <Card className='m-5 p-3 flex flex-col'>
                    <CardContent className='flex flex-row justify-between'>
                        <div className='font-bold'>{match.Team1}</div>
                        <div className=''>{match.Date}</div>
                        <div className='font-bold'>{match.Team2}</div>
                    </CardContent>
                    <CardFooter className='font-light'>{match.ShownName}</CardFooter>
                </Card>
            ))
        }
    </div>
  )
}

export default Schedule