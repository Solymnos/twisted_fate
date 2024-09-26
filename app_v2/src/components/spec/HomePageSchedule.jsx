import React , { useContext, useEffect, useState } from 'react';
import { format , isToday , isTomorrow , parseISO , isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ScheduleContext } from '../../context/ScheduleContext';
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox"

const HomePageSchedule = () => 
{
    const { scheduleData } = useContext(ScheduleContext);    
    const [ search , setSearch ] = useState('');
    const [ selectCompetitions , setSelectCompetitions ] = useState([]);

    const isDisplayableMatch = ( match ) =>
    {
        if (match.Team1 == "TBD" || match.Team2 == "TBD")
        {
            return false;
        }
        if (search != '')
        {
            if (!match.Team1.toLowerCase().includes(search.toLowerCase()) && !match.Team2.toLowerCase().includes(search.toLowerCase()))
            {
                return false;
            } 
        }
        if (!selectCompetitions.includes(match.OverviewPage))
        {
            return false;
        }
        return true;
    }

    const filterScheduleData = ( scheduleData ) =>
    {
        const displayScheduleData = [];
        for (let i = 0; i < scheduleData.length; i++)
        {
            let competition = scheduleData[i];
            for (let j = 0; j < competition.Matches.length; j++)
            {
                let match = competition.Matches[j];
                if (isDisplayableMatch(match))
                {
                    displayScheduleData.push(match);
                }
            }
        }
        return displayScheduleData;
    }

    const getCompetitionMenuData = ( scheduleData ) =>
    {
        const competitionMenuData = [];
        for (let i = 0; i < scheduleData.length; i++)
        {
            let competiton = scheduleData[i];
            let competitionData = { id : competiton.Name, label : competiton.Name }
            competitionMenuData.push(competitionData);
        }
        return competitionMenuData;
    }

    const getSelectCompetitions = ( scheduleData ) =>
    {
        const selectCompetitionInit = [];
        for (let i = 0; i < scheduleData.length; i++)
        {
            let competition = scheduleData[i];
            console.log(competition);
            selectCompetitionInit.push(competition.Name);
        }
        console.log("INIT")
        console.log(selectCompetitionInit);
        return selectCompetitionInit;
    }

    const sortScheduleData = (displayScheduleData) =>
    {
        let sortedScheduleData = [...displayScheduleData].sort((a , b) => new Date(a.Date) - new Date(b.Date))
        let scheduleGroupByDate = {};

        for (let match of sortedScheduleData)
        {
            const date = parseISO(match.Date);
            let day;
            if (isToday(date))
            {
                day = 'Aujourd\'hui';
            } else if (isTomorrow(date))
            {
                day = 'Demain';
            } else {
                day = format(date, 'd MMMM yyyy', { locale : fr });
            }

            if (!scheduleGroupByDate[day]) 
            {
                scheduleGroupByDate[day] = [];
            }

            scheduleGroupByDate[day].push(match);
        }
        
        
        return scheduleGroupByDate;
    }

    const displayScheduleData = filterScheduleData(scheduleData);       // FILTRE
    const competitionMenuData = getCompetitionMenuData(scheduleData);   // MENU
    const sortedScheduleData = sortScheduleData(displayScheduleData);   // SPLIT PAR JOUR

    useEffect(() =>
    {
        const initSelect = getSelectCompetitions(scheduleData);
        setSelectCompetitions(initSelect);
    }, [scheduleData]);


    return (
        <div className='w-3/4 flex flex-row'>
            <div className='w-1/3 p-5 gap-4 flex flex-col'>
                <Input className='text-white, bg-mDark, rounded-xl' placeholder='Recherche' value={search} onChange={(e) => setSearch(e.target.value)} />
                {
                    competitionMenuData.map(competition =>
                    (
                        <div className='flex flex-row gap-2 items-center'>
                            <Checkbox checked={selectCompetitions.includes(competition.id)} onCheckedChange={() => {
                                if (selectCompetitions.includes(competition.id))
                                {
                                    let filtredCompetitions = selectCompetitions.filter(function(e) { return e !== competition.id })
                                    setSelectCompetitions(filtredCompetitions)
                                } else {
                                    let filtredCompetitions = [...selectCompetitions, competition.id];
                                    setSelectCompetitions(filtredCompetitions);
                                }
                            }} className='bg-mWhite'/>
                            <label className='text-mWhite'>{competition.label}</label>
                        </div>
                    ))
                }
            </div>
            <div className='w-2/3'>
                <div className='w-full h-full p-5 flex flex-col gap-6'>
                    {
                        Object.keys(sortedScheduleData).map((day) => (
                            <div className='flex flex-col gap-4' key={day}>
                                <h1 className='text-mWhite text-3xl font-bold'>{day}</h1>
                                {
                                    sortedScheduleData[day].map(match => (
                                        <div className='flex flex-row'>
                                            <div className='rotate-180 bg-mDark text-mPurple text-center text-3xl font-black' style={{ writingMode: 'vertical-rl'}}>
                                                95%
                                            </div>
                                            <div className='flex-1'>
                                                <div className='flex flex-row justify-between'>
                                                    <h1 className='text-mPurple font-bold'>{match.ShownName}</h1>
                                                    <h1 className='text-mPurple font-bold'>{match.Date}</h1>
                                                    <h1 className='text-mPurple font-bold'>657 votes</h1>
                                                </div>
                                                <div className='border-mPurple border-2 rounded-3xl flex-1 flex flex-row '>
                                                    <div className='w-1/2 flex flex-row justify-between items-center p-4 bg-mPurple rounded-2xl'>
                                                        <img className='max-h-12 max-w-12' src='https://wp.solary.fr/wp-content/uploads/2024/03/PNG_logo_white-7.png' />
                                                        <h1 className='text-mWhite font-bold text-2xl'>{match.Team1}</h1>
                                                    </div>
                                                    <div className='w-1/2 flex flex-row justify-between items-center p-4 rounded-2xl '>
                                                        <h1 className='text-mWhite font-bold text-2xl'>{match.Team2}</h1>
                                                        <img className='max-h-12 max-w-12' src='https://wp.solary.fr/wp-content/uploads/2024/03/PNG_logo_white-7.png' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='rotate-270 bg-mDark text-mPurple text-center text-3xl font-black' style={{ writingMode: 'vertical-rl'}}>
                                                5%
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePageSchedule