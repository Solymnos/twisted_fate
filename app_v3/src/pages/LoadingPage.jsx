import React from 'react'

import { Progress } from "@/components/ui/progress"

const LoadingPage = () => {
    return (
        <div className='h-screen w-screen flex flex-col bg-bg items-center justify-center'>
            <h1 className='text-hl'>LoadingPage</h1>
            <Progress value={33}/>
        </div>
    )
}

export default LoadingPage