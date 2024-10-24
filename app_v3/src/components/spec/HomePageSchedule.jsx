import React , { useContext, useEffect , useState } from 'react';
import { format , isToday , isTomorrow , parseISO , isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ScheduleContext } from '../../context/ScheduleContext';
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox";
import ScheduleMatch from "@/components/spec/ScheduleMatch";

const HomePageSchedule = () => 
{
    const { scheduleData } = useContext(ScheduleContext);    
    const [ search , setSearch ] = useState('');
    const [ selectCompetitions , setSelectCompetitions ] = useState([]);

    const isDisplayableMatch = ( match ) =>
    {
        // Filtre excluant les matchs dont on ne connait pas encore les équipes
        if (match.Team1 == "TBD" || match.Team2 == "TBD") 
        {
            return false;
        }
        // Filtre excluant les matchs qui ne contiennent pas la team recherchée
        if (search != '')
        {
            if (!match.Team1.toLowerCase().includes(search.toLowerCase()) && !match.Team2.toLowerCase().includes(search.toLowerCase()))
            {
                return false;
            } 
        }
        // Filtre excluant les matchs dont la compétition n'est pas sélectionnée
        if (!selectCompetitions.includes(match.OverviewPage))
        {
            return false;
        }
        // Filtre excluant les matchs dont la date est dépassée
        //if (new Date(match.DateTime.replace(' ', 'T')) < new Date())
        //{
        //    return false;
        //}
        return true;
         
    }

    const filterScheduleData = ( scheduleData ) =>
    {
        const displayScheduleData = [];
        for (let i = 0; i < scheduleData.length; i++)
        {
            let match = scheduleData[i];
            if (isDisplayableMatch(match))
            {
                displayScheduleData.push(match);
            }
        }
        return displayScheduleData;
    }

    const getCompetitionMenuData = ( scheduleData ) =>
    {
        const competitionMenuData = [];
        for (let i = 0; i < scheduleData.length; i++)
        {
            let match = scheduleData[i];
            if (!competitionMenuData.some(tournament => tournament.id === match.OverviewPage))
            {
                let competitionData = { id : match.OverviewPage, label : match.ShownName }
                competitionMenuData.push(competitionData);
            }
        }
        return competitionMenuData;
    }

    const getSelectCompetitions = ( scheduleData ) =>
    {
        const selectCompetitionInit = [];
        for (let i = 0; i < scheduleData.length; i++)
        {
            let match = scheduleData[i];
            if (!selectCompetitionInit.some(tournament => tournament == match.OverviewPage))
            {
                selectCompetitionInit.push(match.OverviewPage);
            }
        }
        return selectCompetitionInit;
    }

    const sortScheduleData = (displayScheduleData) =>
    {
        let sortedScheduleData = [...displayScheduleData].sort((a , b) => new Date(a.DateTime) - new Date(b.DateTime))
        let scheduleGroupByDate = {};

        for (let match of sortedScheduleData)
        {
            const date = parseISO(match.DateTime);
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
                                        <ScheduleMatch match={match} />
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