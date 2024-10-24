import React , { useContext , useState } from 'react';
import Header from '../components/global/Header';
import { Carousel, CarouselContent , CarouselItem , CarouselNext , CarouselPrevious } from '../components/ui/carousel';
import { ScheduleContext } from '@/context/ScheduleContext';
import BCompetition from '@/components/spec/BCompetition';

function BetsPage() 
{
	const { scheduleData } = useContext(ScheduleContext);
	const [ selectedCompetitions , setSelectedCompetitions ] = useState([]);

	const getListOfCompetitions = ( scheduleData ) =>
	{
		const listOfCompetitions = [];
		for (let i = 0; i < scheduleData.length; i++)
		{
			let match = scheduleData[i];
			if (!listOfCompetitions.includes(match.ShownName))
			{
				listOfCompetitions.push(match.ShownName);
			}
		}

		return listOfCompetitions;
	}

	const sortMatchesByCompetitions = (scheduleData) =>
	{
		const matchesByCompetitions = [];

		for (const match of scheduleData)
		{
			const existingCompetition = matchesByCompetitions.find(comp => comp.competition === match.ShownName);

			if (existingCompetition)
			{
				existingCompetition.matches.push(match);
			} else {
				matchesByCompetitions.push({
					competition : match.ShownName,
					matches : [match]
				})
			}
		}

		return matchesByCompetitions;
	}

	const isDisplayableMatch = ( match ) =>
	{
		if (match.Team1 == "TBD" || match.Team2 == "TBD")
		{
			return false;
		}

		if (selectedCompetitions.length !== 0)
		{
			if (!selectedCompetitions.includes(match.ShownName))
			{
				return false;
			}
		}

		return true;
	}

	const parseMatches = (scheduleData) =>
	{
		const parsedMatches = [];
		for (let i = 0 ; i < scheduleData.length ; i++)
		{
			let match = scheduleData[i];
			if (isDisplayableMatch(match))
			{
				parsedMatches.push(match);
			}
		}
		return parsedMatches;
	}

	const listOfCompetitions = getListOfCompetitions(scheduleData);
	const parsedMatches = parseMatches(scheduleData);
	const matchesByCompetitions = sortMatchesByCompetitions(parsedMatches);


	return (
    	<div className='w-screen min-h-dvh flex bg-bg flex-col'>
        	<Header />
        	<div className='w-full grow flex flex-col items-center gap-8'>
				<div className='w-full p-8 box-border flex flex-wrap gap-6'>
					{
						listOfCompetitions.map((competition , index) => 
							{
								return selectedCompetitions.includes(competition) ? (
									<div className='bg-hl p-4 w-auto inline-block rounded-md cursor-pointer' onClick={() =>
										{
											let filtredCompetitions = selectedCompetitions.filter(function(e) { return e !== competition })
											setSelectedCompetitions(filtredCompetitions);
										}
									}>
										<h1 className='text-dtext font-sans text-xl'>{competition}</h1>
									</div>
								) : (
									<div className='bg-lightbg p-4 w-auto inline-block rounded-md cursor-pointer' onClick={() =>
										{
											let filtredCompetitions = [...selectedCompetitions, competition];
											setSelectedCompetitions(filtredCompetitions);
										}
									}>
										<h1 className='text-ltext font-sans text-xl'>{competition}</h1>
									</div>
								)
							}
							
						)
					}
				</div>
				{
					matchesByCompetitions.map(competition => (
						<BCompetition competition={competition}/>
					))
				}
      		</div>
    	</div>
  	)
}

export default BetsPage