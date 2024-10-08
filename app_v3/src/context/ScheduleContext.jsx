import React , { createContext , useState } from 'react';
import { getSchedule } from '../hooks/Data';

export const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) =>
{
    const [ scheduleData , setScheduleData ] = useState( null );

    const fetchSchedule = async () =>
    {
        const { success , error , response } = await getSchedule();
        if ( success )
        {
            setScheduleData( response );
        } else {
            // TODO : MAYBE A TOAST HERE
            console.log( error );
            setScheduleData( null );
        }
    }

    return (
        <ScheduleContext.Provider value={{ scheduleData , fetchSchedule }}>
            { children }
        </ScheduleContext.Provider>
    )
}