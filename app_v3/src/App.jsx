import { useContext , useEffect , useState } from 'react';
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';


import { preloadImagesFromUrlList } from './utils/Images';

import { OverContext } from './context/OverContext';
import { ScheduleContext } from './context/ScheduleContext';
import { CookieContext } from './context/CookieContext';
import { UserContext } from './context/UserContext';
import { BetsContext } from './context/BetsContext';
import { GeneralDataContext } from './context/GeneralDataContext';

import HomePage from './pages/HomePage';
import BetsPage from './pages/BetsPage';
import ProfilePage from './pages/ProfilePage';
import TeamPage from './pages/TeamPage';
import RankPage from './pages/RankPage';
import LoadingPage from './pages/LoadingPage';

function App() 
{
	const [ isReady , setIsReady ] = useState(false);
	const [ loadingValue , setLoadingValue ] = useState(0);
	const [ loadingText , setLoadingText ] = useState('Chargements des cookies...');

	const { fetchOver , overData } = useContext(OverContext);
	const { fetchSchedule , scheduleData } = useContext(ScheduleContext);
	const { fetchLogCookie , isLogged } = useContext(CookieContext);
	const { fetchUser } = useContext(UserContext);
	const { fetchAllBets , fetchGlobalBets } = useContext(BetsContext);
	const { fetchUserRanking } = useContext(GeneralDataContext);

	useEffect(() =>
	{
		const initCookie = async () =>
			{
				fetchLogCookie();
				setLoadingValue(10);
				setLoadingText('Chargements du programme...');
			}

		const initSchedule = async() =>
		{
			await fetchSchedule();
			setLoadingValue(20);
			setLoadingText('Chargements des résultats...')
		}

		const initOver = async () =>
		{
			await fetchOver();
			setLoadingValue(30);
			setLoadingText('Chargement des infos utilisateurs...')
		}

		const initUser = async () =>
		{
			await fetchUser();
			setLoadingValue(40);
			setLoadingText('Chargement des bets...')
		}

		const initBets = async () =>
		{
			await fetchAllBets();
			setLoadingValue(50);
			setLoadingText('Chargement des images...')
		}

		const initUnlogBets = async () =>
		{
			await fetchGlobalBets();
			setLoadingValue(50);
			setLoadingText('Chargement des images...')
		}

		const initGeneralData = async () =>
		{
			await fetchUserRanking();
			setLoadingValue(70);
		}

		const initAll = async () =>
		{
			await initCookie();
			await initSchedule();
			await initOver();
			if ( isLogged )
			{
				console.log("PASS IS LOGGED");
				await initUser();
				await initBets();
			} else {
				console.log("PASS ISNT LOG");
				await initUnlogBets();
			}
			await initGeneralData();
			// await initImages( scheduleData , overData );
		}
		initAll();
	}, []);


	useEffect(() =>
	{
		const initBets = async () =>
		{
			await fetchAllBets();
			setLoadingValue(50);
			setLoadingText('Chargement des images...')
		}

		const initUnlogBets = async () =>
		{
			await fetchGlobalBets();
			setLoadingValue(50);
			setLoadingText('Chargement des images...')
		}

		const initUser = async () =>
		{
			await fetchUser();
			setLoadingValue(40);
			setLoadingText('Chargement des bets...')
		}

		if (isLogged)
		{
			console.log("FINALLY LOG");
			initUser();
			initBets();
		} else {
			console.log("STILL UNLOG");
			initUnlogBets();
		}
		
	}, [ isLogged ])

	useEffect(() =>
	{
		let initImages = async () =>
		{
			if (scheduleData && overData)
			{
				let urlList = [];

				for (let i = 0; i < scheduleData.length; i++)
				{
					if (!urlList.includes(scheduleData[i].Team1ImageUrl))
					{
						urlList.push(scheduleData[i].Team1ImageUrl);
					}
					if (!urlList.includes(scheduleData[i].Team2ImageUrl))
					{
						urlList.push(scheduleData[i].Team2ImageUrl);
					}
				}
				

				for (let i = 0; i < overData.length; i++)
				{
					if (!urlList.includes(overData[i].Team1ImageUrl))
					{
						urlList.push(overData[i].Team1ImageUrl);
					}
					if (!urlList.includes(overData[i].Team2ImageUrl))
					{
						urlList.push(overData[i].Team2ImageUrl);
					}
				}
				preloadImagesFromUrlList(urlList);
				setLoadingValue(99);
				setLoadingText('Ready !');
				setIsReady(true);
			}
		}

		initImages();
	}, [ scheduleData , overData ])


	if (!isReady)
	{
		return (
			<LoadingPage loadingValue={loadingValue} loadingText={loadingText}/>
		)
	}

  return (
    <Router>
		<Routes>
			<Route path='/' element={<HomePage />}/>
			<Route path='/bets' element={<BetsPage />}/>
			<Route path='/profile' element={<ProfilePage />}/>
			<Route path='/team' element={<TeamPage />}/>
			<Route path='/rank' element={<RankPage />}/>
		</Routes>
	</Router>
  )
}

export default App
