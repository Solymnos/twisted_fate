import React , { useState , useEffect } from "react"
import Header from "@/components/global/Header"
import Schedule from "@/components/spec/Schedule";
import Cookies from 'js-cookie';

import { userGetMe } from "./hooks/User";
import { useToast } from "@/components/ui/use-toast";
import { getSchedule } from "./hooks/Data";

function App() 
{
  const [ cookieLog , setCookieLog ] = useState(() => Cookies.get('logged_in') || false);
  const [ user, setUser ] = useState(null);
  const [ schedule , setSchedule ] = useState([]);
  
  const { toast } = useToast();

  // RECHARGEMENT DE LA PAGE

  useEffect(() =>
  {
    const fetchSchedule = async () =>
    {
      let { success, error, response } = await getSchedule();
      if ( success )
      {
        setSchedule(response);
        console.log(response);
      } else {
        toast({
          title : 'Echec de connexion serveur',
          description : error,
          variant : 'destructive'
        })
      }
    }

    const cookie = Cookies.get('logged_in');
    if (cookie) 
    {
      setCookieLog(cookie);
    }
    fetchSchedule();
  } , [])

  useEffect(() =>
  {
    const fetchMe = async () =>
    {
      if (cookieLog === false)
      {
        setUser(null);
      } else {
        let  { success , error , response } = await userGetMe();
        if (success)
        {
          setUser(response);
        } else {
          toast({
            title : 'Echec de connexion serveur',
            description : error,
            variant : 'destructive'
          })
        }
      }
    }

    fetchMe();
  } , [ cookieLog ]);

  const updateLoggedCookie = () =>
  {
    setCookieLog(() => Cookies.get('logged_in') || false);
  }

  return (
    <div className='w-full'>
      <Header updateLoggedCookie={updateLoggedCookie} user={user} />
      <Schedule schedule={schedule} />
    </div>
  )
}

export default App
