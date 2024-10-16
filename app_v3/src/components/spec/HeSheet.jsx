import React, { useContext } from 'react'
import { Sheet , SheetContent , SheetDescription , SheetHeader , SheetTitle , SheetTrigger } from "@/components/ui/sheet"
import { Avatar , AvatarFallback , AvatarImage } from "@/components/ui/avatar"

import { BetsContext } from '@/context/BetsContext'

const HeSheet = ({ userData }) => 
{
    const { userBetsLive } = useContext(BetsContext);
    console.log(userBetsLive);

    return (
        <Sheet>
            <SheetTrigger className='p-0 w-12 h-12 rounded-full'>
                <img className='w-12 h-12 object-cover rounded-full' src={userData.pp} />
            </SheetTrigger>
            <SheetContent className='bg-lightbg flex flex-col pt-16 items-center'>
                <img className='w-20 h-20 rounded-full' src={userData.pp} />
                <h1 className='uppercase font-sans text-ltext font-bold text-2xl'>{userData.username}</h1>
                <div className='flex flex-col w-full grow items-start'>
                    <h1 className='font-sans text-hl font-semibold text-xl'>Mes paris :</h1>
                    <div className='flex flex-col w-full grow items-center'>
                        {
                            userBetsLive.map(bet =>(
                                <div>
                                    {
                                        bet.predict
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default HeSheet