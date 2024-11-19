import React, { useContext, useState } from 'react';
import Header from '../components/global/Header';
import { GeneralDataContext } from '@/context/GeneralDataContext';

import { Button } from "@/components/ui/button"
import { Command , CommandEmpty , CommandGroup , CommandInput , CommandItem, CommandList } from "@/components/ui/command"
import { Popover , PopoverContent , PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const frameworks = [
	{
	  value: "next.js",
	  label: "Next.js",
	},
	{
	  value: "sveltekit",
	  label: "SvelteKit",
	},
	{
	  value: "nuxt.js",
	  label: "Nuxt.js",
	},
	{
	  value: "remix",
	  label: "Remix",
	},
	{
	  value: "astro",
	  label: "Astro",
	},
  ]

function RankPage() 
{

  	const { userRanking } = useContext(GeneralDataContext);
	const [ open , setOpen ] = useState(false);
	const [ value , setValue ] = useState("");
	let tournamentList = []
	let displayUserRanking = []

	const getTournamentList = ( userRanking ) =>
	{
		let list= [];

		for (let i = 0 ; i < userRanking.length ; i ++)
		{
			console.log("user")
			console.log(userRanking[i].username)
			console.log("userbets")
			console.log(userRanking[i].bets.length)
			for (let j = 0 ; j < userRanking[i].bets.length ; j++)
			{
				if (!list.some(item => item.value === userRanking[i].bets[j].OverviewPage))
				{
					list.push({"value" : userRanking[i].bets[j].OverviewPage, "label" : userRanking[i].bets[j].Tournament })
				}
			}
		}
		tournamentList = (list)
	}

  	const parseUserRanking = ( userRanking ) =>
	{
		let parsedUserRanking = [];

		for (let i = 0 ; i < userRanking.length ; i++)
		{
			let totalFail = 0;
			let totalSuccess = 0;
			let per = 0;
			for (let j = 0; j < userRanking[i].bets.length; j++)
			{
				totalFail += userRanking[i].bets[j].bFail;
				totalSuccess += userRanking[i].bets[j].bSuccess;
			}
			if (totalFail != 0 || totalSuccess != 0)
			{
				per = totalSuccess/(totalSuccess + totalFail) * 100;
			}
			parsedUserRanking.push({...userRanking[i], 'per' : per, 'total' : totalFail + totalSuccess})
		}

		const sortedUserRanking = parsedUserRanking.sort((a, b) => b.per - a.per);
		return sortedUserRanking;
	}

	const parseUserRankingSelect = ( userRanking ) =>
	{
		let parsedUserRanking = [];

		for (let i = 0 ; i < userRanking.length; i++)
		{
			const bet = userRanking[i].bets.find(item => item.OverviewPage === value)
			if (bet) 
			{
				console.log("BET")
				console.log(bet)

				if (bet.bFail != 0 || bt.bSuccess != 0)
				{
					let per = bet.bSuccess/(bet.bSuccess + bet.bFail) * 100;
					parsedUserRanking.push({...userRanking[i], 'per' : per , 'total' : bet.bSuccess + bet.bFail})
				}
			}
		}
		const sortedUserRanking = parsedUserRanking.sort((a , b) => b.per - a.per);
		return sortedUserRanking;
	}

	getTournamentList(userRanking)
	
	if (value == "")
	{
		displayUserRanking = parseUserRanking(userRanking);	
	} else {
		displayUserRanking = parseUserRankingSelect(userRanking)
	}
	//const displayUserRanking = parseUserRanking(userRanking);
	console.log(displayUserRanking); 

  return (
    <div className='w-screen min-h-dvh flex bg-bg flex-col '>
        <Header />
        <div className='w-full grow flex flex-col items-center gap-4'>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
						{
							value ? tournamentList.find((tournament) => tournament.value === value)?.label
							: "Global"
						}
						<ChevronsUpDown className='opacity-50' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0">
					<Command>
						<CommandInput placeholder="Chercher compétition..." />
						<CommandList>
							<CommandEmpty>Pas encore de paris.</CommandEmpty>
							<CommandGroup>
								{
									tournamentList.map((tournament) =>(
										<CommandItem
											key={tournament.value}
											value={tournament.value}
											onSelect={(currentValue) => {
												setValue(currentValue === value ? "" : currentValue)
												setOpen(false)
											}}
											>
												{tournament.label}
												<Check className={cn("ml-auto", value === tournament.value ? "opacity-100" : "opacity-0" )} />
											</CommandItem>
									))
								}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		{
			
			displayUserRanking.map((user, index) =>
			(
				<div className='flex flex-row bg-card p-2 rounded-xl justify-center items-center w-2/3 gap-6'>
					<div className='flex flex-row grow'>
						<img className='max-h-8 max-w-8 rounded-full' src={user.pp}/>
                    	<h1 className='font-sans grow mx-2 uppercase text-lg font-bold'>{user.username}</h1>
					</div>
					<h2 className='font-sans font-bold'>{user.total} bet(s)</h2>
                    <h2 className='font-sans font-bold'>{user.per.toFixed(2)}%</h2>
                </div>
			))
		}
        </div>
    </div>
  )
}

export default RankPage