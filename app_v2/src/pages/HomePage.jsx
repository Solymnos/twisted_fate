import React from 'react'
import Header from '../components/global/Header'

import HomePageSchedule from '../components/spec/HomePageSchedule'
import HomePageOver from '../components/spec/HomePageOver'

function HomePage() {
  return (
    <div className='w-full min-h-dvh flex bg-mDark flex-col'>
      <Header />
      <div className='w-full grow flex flex-row'>
        <HomePageSchedule />
        <HomePageOver />
      </div>
    </div>
  )
}

export default HomePage