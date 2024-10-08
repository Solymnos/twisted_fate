import React from 'react'

import { Progress } from "@/components/ui/progress"

const LoadingPage = ({ loadingValue , loadingText }) => {
    return (
        <div className='h-screen w-screen flex flex-col bg-bg items-center justify-center gap-5'>
            
            <Progress className='max-w-60' value={loadingValue}/>
            <text className='text-hl'>{loadingText}</text>
        </div>
    )
}

export default LoadingPage