import React, { useContext } from 'react'
import { GeneralDataContext } from '@/context/GeneralDataContext'

const HPRank = () => 
{
    const { userRanking } = useContext(GeneralDataContext);

    const parseUserRanking = ( userRanking ) =>
    {
        let parsedUserRanking = [];

        for (let i = 0; i < userRanking.length; i++)
        {
            let per = 0;

            if (userRanking[i].bsuccess != 0 || userRanking[i].bfail != 0)
            {
                per = userRanking[i].bsuccess/(userRanking[i].bsuccess + userRanking[i].bfail) * 100;
            }
            parsedUserRanking.push({...userRanking[i], 'per' : per})
        }

        const sortedUserRanking = parsedUserRanking.sort((a , b) => b.per - a.per);
        const finalUserRanking = sortedUserRanking.slice(0,10);
        return finalUserRanking;
    }

    const displayUserRanking = parseUserRanking(userRanking);


    return (
        <div className='w-1/2 p-8 flex flex-row gap-8'>
            <div className='w-1/3 justify-center items-center align-middle flex'>
                <div className='bg-hl rounded-3xl text-xl text-dtext font-bold font-sans p-3'>Classement</div>
            </div>
            <div className='w-2/3 flex flex-col gap-2'>
                {
                    displayUserRanking.map((user, index) => (
                        <div className='flex flex-row bg-card p-2 rounded-xl justify-center items-center'>
                            <img className='max-h-8 max-w-8 rounded-full' src={user.pp}/>
                            <h1 className='font-sans grow mx-2 uppercase text-lg font-bold'>{user.username}</h1>
                            <h2 className='font-sans font-bold'>{user.per.toFixed(2)}%</h2>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default HPRank