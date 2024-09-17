import React from 'react';
import Header from '../components/global/Header';

function BetsPage() {
  return (
    <div className='w-full min-h-dvh flex bg-mDark flex-col'>
      <Header />
      <div className='w-full grow justify-center text-center items-center flex'>
        <h1 className='text-mWhite'>Pas encore prêt, bientôt !</h1>
      </div>
    </div>
  )
}

export default BetsPage