import React, { useContext } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import Autoplay from "embla-carousel-autoplay"

import { OverContext } from '@/context/OverContext';
import HPOverCard from './HPOverCard';

const HPOver = () => 
{
    const { overData } = useContext(OverContext);
    
    const sortedOverData = overData.sort((a , b) => b.DateTime - a.DateTime);
    const displayOverData = sortedOverData.slice(0, 10);
    
    console.log(overData);
    
    return (
        <div className='bg-lightbg w-full p-8 box-border'>
            <Carousel plugins={[Autoplay({ delay : 5000 })]} opts={{ align : 'start', loop: true }} className='w-full'>
                <CarouselContent>
                    {displayOverData.map((match , index) =>(
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <HPOverCard match={match}/>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
  )
}

export default HPOver

/*

    */