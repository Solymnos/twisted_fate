import React from 'react'

const UserBetCard = ({ bet }) => {
  return (
    <div className='bg-card w-full flex flex-col p-4 rounded-xl'>
        <div className='flex w-full flex-row'>
            <div className='w-1/2 justify-center items-center flex'>
                <img className='max-w-8 max-h-8' src={bet.Team1ImageUrl}/>
            </div>
            <div className='w-1/2 justify-center items-center flex'>
                <img className='max-w-8 max-h-8' src={bet.Team2ImageUrl}/>
            </div>
        </div>
        <div className='w-full flex flex-row'>
            <div className='w-1/2 text-center font-sans font-normal'>
                {bet.Team1}
            </div>
            <div className='w-1/2 text-center font-sans font-normal'>
                {bet.Team2}
            </div>    
        </div>
        <div className='w-full'>
           <h1 className='font-sans text-xl text-dtext'>Votre choix : <span className='font-bold'>{bet.predict}</span></h1>
        </div>
    </div>
  )
}

export default UserBetCard