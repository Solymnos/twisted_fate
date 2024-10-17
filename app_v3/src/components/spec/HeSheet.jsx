import React, { useContext } from 'react'
import { Sheet , SheetContent , SheetDescription , SheetHeader , SheetTitle , SheetTrigger } from "@/components/ui/sheet"
import { Avatar , AvatarFallback , AvatarImage } from "@/components/ui/avatar"

import { BetsContext } from '@/context/BetsContext'
import { ScheduleContext } from '@/context/ScheduleContext'
import UserBetCard from './UserBetCard'

const HeSheet = ({ userData }) => 
{
    const { userBetsLive } = useContext(BetsContext);
    const { scheduleData } = useContext(ScheduleContext);
    console.log(userBetsLive);
    console.log(scheduleData);

    const parseBets = ( userBetsLive , scheduleData ) =>
    {
        let parsedBetsData = [];

        for (let i = 0 ; i < userBetsLive.length ; i++)
        {
            const match = scheduleData.find(match => match.MatchId === userBetsLive[i].matchId);
            if (match)
            {
                parsedBetsData.push({...userBetsLive[i], 
                    'Team1' : match.Team1Short, 
                    'Team2' : match.Team2Short,
                    'Team1ImageUrl' : match.Team1ImageUrl, 
                    'Team2ImageUrl' : match.Team2ImageUrl,
                    'DateTime' : match.DateTime,
                    'ShownName' : match.ShownName })
            }
        }
        return parsedBetsData;
    }

    const parsedBetsData = parseBets( userBetsLive, scheduleData );

    return (
        <Sheet>
            <SheetTrigger className='p-0 w-12 h-12 rounded-full'>
                <img className='w-12 h-12 object-cover rounded-full' src={userData.pp} />
            </SheetTrigger>
            <SheetContent className='bg-lightbg flex flex-col pt-16 items-center border-0'>
                <img className='w-20 h-20 rounded-full' src={userData.pp} />
                <h1 className='uppercase font-sans text-ltext font-bold text-2xl'>{userData.username}</h1>
                <div className='flex flex-col w-full grow items-start gap-4'>
                    <h1 className='font-sans text-hl font-semibold text-xl'>Mes paris en cours :</h1>
                    <div className='flex flex-col w-full grow items-center gap-4 max-h-96 pr-4 overflow-y-auto'>
                        {
                            parsedBetsData.map(bet =>(
                                <UserBetCard bet={bet} />
                            ))
                        }
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default HeSheet