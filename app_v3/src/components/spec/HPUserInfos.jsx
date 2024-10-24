import React , { useContext } from 'react'
import { UserContext } from '@/context/UserContext'
import { CookieContext } from '@/context/CookieContext';

const HPUserInfos = () => 
{
	const { isLogged } = useContext(CookieContext);
	const { userData } = useContext(UserContext);

	if (isLogged && userData)
	{
		return (
		<div className='relative w-1/2 flex justify-start items-end'>
			  <div className='bg-lightbg w-4/5 h-4/5 flex flex-col mt-8 rounded-2xl p-8'>
				  <div className='w-full flex-row flex gap-4'>
					<img className='w-1/3 border-2 border-hl' src={userData.pp}/>
					<div className='w-2/3 flex flex-col justify-end '>
						<h1 className='text-hl text-2xl font-sans uppercase font-bold'>{userData.username}</h1>
						<h2 className='text-ltext text-xl font-sans font-semibold'>Niveau 5</h2>
					</div>
				</div>
				<div className='w-full p-8'>
					<div className='w-full flex flex-row bg-bg rounded-3xl'>
						<div className='w-1/2 rounded-3xl bg-hl font-sans font-semibold flex justify-center items-center text-dtext p-4'>Paris réussis</div>
						<div className='w-1/2 font-sans font-semibold text-ltext flex justify-center items-center'>{userData.bsuccess}</div>
					</div>
				</div>
				<div className='w-full p-8'>
					<div className='w-full flex flex-row bg-bg rounded-3xl'>
						<div className='w-1/2 rounded-3xl bg-hl font-sans font-semibold flex justify-center items-center text-dtext p-4'>Paris ratés</div>
						<div className='w-1/2 font-sans font-semibold text-ltext flex justify-center items-center'>{userData.bfail}</div>
					</div>
				</div>
			  </div>
			  <div class="absolute top-0 right-0 bg-hl w-2/5 p-4 font-sans text-2xl font-bold rounded-3xl text-right">
				Profil
			  </div>
		</div>
		)
	} else 
	{
		return (
			<div className='w-1/2 flex justify-center p-6 bg-lightbg rounded-2xl'>
				<h1 className='text-ltext font-bold text-2xl'> Connectez vous pour accéder à plus de contenus.</h1>
			</div>
		)
	}
	
	
}

export default HPUserInfos