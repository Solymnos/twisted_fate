import React , { useState } from "react"
import { SunMedium } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import SubscribeDialog from "../spec/SubscribeDialog"
import LoginDialog from "@/components/spec/LoginDialog"
import UserSheet from "@/components/spec/UserSheet"

const Header = ({updateLoggedCookie, user}) => 
{

    return (
        <div className='w-full bg-pink-100 flex flex-row gap-3 p-3 justify-end items-center'>
            {
                user ? (
                    <>
                        <h1 className='uppercase font-black' >{user.username}</h1>
                        <UserSheet user={user}/>
                    </>
                    
                ) : (
                    <>
                        <SubscribeDialog />
                        <LoginDialog updateLoggedCookie={updateLoggedCookie} />
                    </>
                )
            }
            
        </div>
    )
}

export default Header

/*
        FR
        <SunMedium />
        <Button>S'inscrire</Button>
        <Button>Se connecter</Button>
*/