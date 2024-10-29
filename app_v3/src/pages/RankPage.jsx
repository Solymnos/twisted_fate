import React, { useContext } from 'react';
import Header from '../components/global/Header';
import { GeneralDataContext } from '@/context/GeneralDataContext';

function RankPage() 
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
			parsedUserRanking.push({...userRanking[i], 'per' : per })
		}
		
		const sortedUserRanking = parsedUserRanking.sort((a, b) => b.per - a.per);
		return sortedUserRanking;
	}

	const displayUserRanking = parseUserRanking(userRanking);
	console.log(displayUserRanking); 

  return (
    <div className='w-screen min-h-dvh flex bg-bg flex-col'>
        <Header />
        <div className='w-full grow flex flex-col items-center gap-4'>
		{
			
			displayUserRanking.map((user, index) =>
			(
				<div className='flex flex-row bg-card p-2 rounded-xl justify-center items-center w-2/3'>
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

export default RankPage