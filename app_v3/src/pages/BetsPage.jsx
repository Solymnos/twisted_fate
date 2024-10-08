import React from 'react';
import Header from '../components/global/Header';

function BetsPage() {
  return (
    <div className='w-full min-h-dvh flex bg-mDark flex-col'>
      <Header />
      <div className='w-full grow justify-center text-center items-center flex'>
        <HomePageSchedule />
        <HomePageOver />
      </div>
    </div>
  )
}

export default BetsPage