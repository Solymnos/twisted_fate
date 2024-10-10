import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord , faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <div className='w-full p-8 flex flex-row gap-8 justify-center'>
        <FontAwesomeIcon className='h-8' icon={faDiscord} color='white'/>
        <FontAwesomeIcon className='h-8' icon={faTwitter} color='white'/>
        <FontAwesomeIcon className='h-8' icon={faEnvelope} color='white'/>
    </div>
  )
}

export default Footer