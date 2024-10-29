import React , { useContext } from 'react';
import { Link , useLocation } from 'react-router-dom';

import { CookieContext } from '../../context/CookieContext';
import { UserContext } from '../../context/UserContext';
import RegisterDialog from '../spec/RegisterDialog';
import HeSheet from '../spec/HeSheet';

const Header = () =>
{

	const location = useLocation();

    const { isLogged, updateLoggedCookie } = useContext(CookieContext);
    const { userData } = useContext(UserContext);

    return (
		<div className='flex flex-row w-full min-h-24 p-8 justify-between '>
			<div className='flex-1 content-center items-center'>
				<Link to='/'><h1 className='text-ltext font-thunder font-black text-4xl tracking-tight cursor-pointer'>TWISTED<span className='text-hl'>FATE</span></h1></Link>
			</div>
			<div className='flex-1 flex flex-row justify-center items-center gap-4'>
				{
					location.pathname === '/bets' ? (
						<Link to='/bets'><h2 className='font-sans text-hl text-2xl cursor-pointer'>Bets</h2></Link>
					) :
					(
						<Link to='/bets'><h2 className='font-sans text-ltext text-2xl cursor-pointer transition-all duration-1000 bg-clip-text' id='appear'>Bets</h2></Link>
					)
				}
			    {
			        location.pathname === '/rank' ? (
			            <Link to='/rank'><h2 className='font-sans text-hl text-2xl cursor-pointer'>Classement</h2></Link>
			        ) : (
			            <Link to='/rank'><h2 className='font-sans text-ltext text-2xl cursor-pointer transition-all duration-1000 bg-clip-text' id='appear'>Classement</h2></Link>
			        )
			    }
                {
                    location.pathname === '/profile' ? (
                        <Link to='/profile'><h2 className='font-sans text-hl text-2xl cursor-pointer'>Profil</h2></Link>
                    ) : (
                        <Link to='/profile'><h2 className='font-sans text-ltext text-2xl cursor-pointer transition-all duration-1000 bg-clip-text' id='appear'>Profil</h2></Link>
                    )
                }
                
			</div>
			<div className='flex-1 flex justify-end items-center pr-8'>
			{
            isLogged && userData ? (
                <div className='flex flex-row items-center gap-4'>
                    <h1 className='uppercase font-black font-sans text-xl text-ltext'>{userData.username}</h1>
                    <HeSheet userData={userData} />
                </div>
            ) : (
                <div>
                    <RegisterDialog updateLoggedCookie={updateLoggedCookie}/>
                </div>
            )
            }   
			</div>
        </div>
    )
}

export default Header

// <Button className='bg-mWhite text-mDark text-xl p-6 rounded-3xl hover:text-mWhite font-thunder font-bold' >Se connecter</Button>

/*

{
    location.pathname === '/team' ? (
        <Link to='/team'><h2 className='font-sans text-hl text-2xl cursor-pointer'>Team</h2></Link>
    ) : (
		<Link to='/team'><h2 className='font-sans text-ltext text-2xl cursor-pointer transition-all duration-1000 bg-clip-text' id='appear'>Team</h2></Link>
    )
}

*/