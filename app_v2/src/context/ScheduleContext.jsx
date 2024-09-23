import React , { createContext , useState , useEffect } from 'react';
import { apiSchedule } from '../services/API';
import { getSchedule } from '../hooks/Data';

export const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) =>
{
    const [ scheduleData , setScheduleData ] = useState(false);

    useEffect(() =>
    {
        const fetchSchedule = async () =>
        {
            const { success , error , response } = await getSchedule();
            if ( success )
            {
                setScheduleData(response);
            } else {
                // TODO : MAYBE A TOAST HERE
                console.log(error);
                setScheduleData(null);
            }
        }
        fetchSchedule();
    }, []);

    return (
        <ScheduleContext.Provider value={{ scheduleData , setScheduleData }}>
            { children }
        </ScheduleContext.Provider>
    )
}