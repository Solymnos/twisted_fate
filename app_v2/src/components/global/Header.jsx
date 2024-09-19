import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

import RegisterDialog from '../spec/RegisterDialog';

const Header = () => {
  return (
    <div className='flex flex-row bg-mPurple w-full min-h-24 p-8 items-center justify-between'>
        <div className='flex flex-row items-center gap-8'>
            <Link to='/'><h1 className='text-mWhite font-thunder font-black text-6xl tracking-tight cursor-pointer'>TWISTED<span className='text-mDark'>FATE</span></h1></Link>
            <div className='flex flex-row items-center gap-4'>
                <Link to='/bets'><h2 className='text-mWhite font-thunder font-black text-3xl cursor-pointer hover:underline decoration-4 decoration-mDark'>Bets</h2></Link>
                <Link to='/rank'><h2 className='text-mWhite font-thunder font-black text-3xl cursor-pointer hover:underline decoration-4 decoration-mDark'>Notes</h2></Link>
                <Link to='/team'><h2 className='text-mWhite font-thunder font-black text-3xl cursor-pointer hover:underline decoration-4 decoration-mDark'>Team</h2></Link>
                <Link to='/profile'><h2 className='text-mWhite font-thunder font-black text-3xl cursor-pointer hover:underline decoration-4 decoration-mDark'>Profil</h2></Link>
            </div>
        </div>
        <div>
            <RegisterDialog />
        </div>
    </div>
  )
}

export default Header

// <Button className='bg-mWhite text-mDark text-xl p-6 rounded-3xl hover:text-mWhite font-thunder font-bold' >Se connecter</Button>