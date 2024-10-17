import React from 'react'
import Header from '../components/global/Header'
import Footer from '../components/global/Footer'
import HPSchedule from '@/components/spec/HPSchedule'
import HPOver from '@/components/spec/HPOver'
import HPUserInfos from '@/components/spec/HPUserInfos'
import HPRank from '@/components/spec/HPRank'

function HomePage() {
  return (
    <div className='w-screen min-h-dvh flex bg-bg flex-col'>
      <Header />
      <div className='w-full grow flex flex-col items-center gap-8'>
        <HPSchedule />
        <HPOver />
        <HPRank />
        <HPUserInfos />
        <Footer />
      </div>
    </div>
  )
}

export default HomePage