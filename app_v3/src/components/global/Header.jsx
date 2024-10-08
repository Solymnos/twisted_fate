import React , { useState , useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import RegisterDialog from '../spec/RegisterDialog';

import Cookies from 'js-cookie';
import { CookieContext } from '../../context/CookieContext';
import { UserContext } from '../../context/UserContext';

const Header = () =>
{

  const { isLogged, updateLoggedCookie } = useContext(CookieContext);
  const { userData } = useContext(UserContext);

  return (
	<div className='flex flex-row w-full min-h-24 p-8 justify-between'>
		<div className='flex-1 content-center items-center'>
			<Link to='/'><h1 className='text-ltext font-thunder font-black text-4xl tracking-tight cursor-pointer'>TWISTED<span className='text-hl'>FATE</span></h1></Link>
		</div>
		<div className='flex-1 flex flex-row justify-center items-center gap-4'>
			<Link to='/bets'><h2 className='font-sans text-ltext text-2xl cursor-pointer transition-all duration-1000 bg-clip-text' id='appear'>Bets</h2></Link>
            <Link to='/rank'><h2 className='font-sans text-ltext text-2xl cursor-pointer transition-all duration-1000 bg-clip-text' id='appear'>Notes</h2></Link>
            <Link to='/team'><h2 className='font-sans text-ltext text-2xl cursor-pointer transition-all duration-1000 bg-clip-text' id='appear'>Team</h2></Link>
            <Link to='/profile'><h2 className='font-sans text-ltext text-2xl cursor-pointer transition-all duration-1000 bg-clip-text' id='appear'>Profil</h2></Link>
		</div>
		<div className='flex-1 flex justify-end items-center '>
		{
          isLogged && userData ? (
            <div>
              <h1 className='uppercase font-black'>{userData.username}</h1>
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

<div className='flex flex-row w-full min-h-24 p-8 items-center justify-between'>
        <div className='flex flex-row items-center gap-8'>
            <Link to='/'><h1 className='text-ltext font-thunder font-black text-6xl tracking-tight cursor-pointer'>TWISTED<span className='text-hl'>FATE</span></h1></Link>
            <div className='flex flex-row items-center gap-4'>
                
            </div>
        </div>
        {
          isLogged && userData ? (
            <div>
              <h1 className='uppercase font-black'>{userData.username}</h1>
            </div>
          ) : (
            <div>
              <RegisterDialog updateLoggedCookie={updateLoggedCookie}/>
            </div>
          )
        }
        
    </div>
  */