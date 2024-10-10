import React from 'react'
import BMatchCard from './BMatchCard'

const BCompetition = ({ competition }) => 
{
	return (
    	<div className='w-full px-8'>
			<div className='bg-lightbg p-4 rounded-t-2xl inline-block'>
				<h1 className='text-ltext font-sans font-semibold text-2xl'>{competition.competition}</h1>
			</div>
			<div className='bg-lightbg p-4 rounded-b-2xl rounded-tr-2xl'>
				<div className='flex flex-wrap'>
					{
						competition.matches.map((match , index) =>(
								<BMatchCard key={index} match={match} />
						))
					}
				</div>
			</div>
		</div>
  	)
}

export default BCompetition