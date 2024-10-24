import React, { useContext } from 'react';
import Header from '../components/global/Header';
import { userLogout } from '@/hooks/Auth';
import { CookieContext } from '@/context/CookieContext';
import { BetsContext } from '@/context/BetsContext';

function ProfilePage() 
{
	const { isLogged , fetchLogCookie } = useContext(CookieContext);
	const { fetchGlobalBets } = useContext(BetsContext);

	const handleLogout = async () =>
	{
		await userLogout();
		fetchLogCookie();
		await fetchGlobalBets()
	}

    return (
    	<div className='w-screen min-h-dvh flex bg-bg flex-col'>
        	<Header />
        	<div className='w-full grow flex flex-col items-center gap-8'>
				{
					isLogged ? (
						<div onClick={async () => await handleLogout()} className='p-4 bg-hl rounded-xl cursor-pointer'>
							<h1 className='text-dtext text-xl font-bold font-sans'>Se deconnecter</h1>
						</div>
					) : (
						<></>
					)
				}
				
      		</div>
    	</div>
  	)
}

export default ProfilePage