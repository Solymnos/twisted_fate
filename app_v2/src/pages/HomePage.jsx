import React from 'react'
import Header from '../components/global/Header'

function HomePage() {
  return (
    <div className='w-full min-h-dvh flex bg-mDark flex-col'>
      <Header />
      <div className='w-full grow flex flex-row'>
        <div className='flex-1 bg-mPurple'>a</div>
        <div className='flex-[2_2_0%] bg-green-300'>a</div>
        <div className='flex-1 bg-mPurple'>z</div>
      </div>
    </div>
  )
}

export default HomePage