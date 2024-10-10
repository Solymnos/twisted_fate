import React, { useContext } from 'react'

import { ScheduleContext } from '@/context/ScheduleContext'

const HPSchedule = () => 
{
    const { scheduleData } = useContext(ScheduleContext);
    
    const sortedScheduleData = scheduleData.sort((a , b) => b.DateTime - a.DateTime);
    const displayScheduleData = sortedScheduleData.slice(0, 4);
    
    return (
        <div className='w-1/2 p-8 flex flex-col gap-8 h-min'>
            <h1 className='text-hl font-sans font-bold pl-4'>Prochainement :</h1>
            <div className='flex flex-wrap'>
                {
                    displayScheduleData.map(match => (
                        <div className=' w-1/2 min-h-56 p-4'>
                            <div className='bg-card w-full h-full rounded-3xl flex flex-col'>
                                <div className='grow flex flex-row'>
                                    <div className='flex-1 flex flex-col justify-center items-center'>
                                        <img className='max-w-32 max-h-24' src={match.Team1ImageUrl} />
                                    </div>
                                    <div className='flex-1 flex flex-col justify-center items-center'>
                                        <img className='max-w-32 max-h-24' src={match.Team2ImageUrl} />
                                    </div>
                                </div>
                                <div className='w-full flex flex-row'>
                                    <div className='w-1/2 text-center font-sans font-bold'>
                                        {match.Team1}
                                    </div>
                                    <div className='w-1/2 text-center font-sans font-bold'>
                                        {match.Team2}
                                    </div>
                                </div>
                                <div className='w-full flex flex-col text-center bg-lightbg rounded-b-2xl'>
                                    <h1 className='font-sans text-ltext text-2xl font-bold'>{match.ShownName}</h1>
                                    <h2 className='font-sans text-ltext text-base'>{match.DateTime}</h2>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
            <div className='w-full flex justify-end'>
                <h2 className='font-sans text-hl text-3xl font-semibold cursor-pointer hover:underline decoration-4 decoration-hl'>Parier sur ces matchs ➔</h2>
            </div>
        </div>
    )
}

export default HPSchedule