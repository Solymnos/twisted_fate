import React , { useState } from "react"
import { SunMedium } from "lucide-react"

import SubscribeDialog from "../spec/SubscribeDialog"
import LoginDialog from "@/components/spec/LoginDialog"

const Header = () => 
{

    return (
        <div className='w-full bg-pink-100 flex flex-row gap-3 p-3 justify-end items-center'>
            <SubscribeDialog />
            <LoginDialog />
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