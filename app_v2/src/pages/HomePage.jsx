import React from 'react'
import Header from '../components/global/Header'

import HomePageSchedule from '../components/spec/HomePageSchedule'

function HomePage() {
  return (
    <div className='w-full min-h-dvh flex bg-mDark flex-col'>
      <Header />
      <div className='w-full grow flex flex-row'>
        <HomePageSchedule />
        <div className='w-1/4'>z</div>
      </div>
    </div>
  )
}

export default HomePage