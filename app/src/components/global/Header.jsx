import React from "react"
import { SunMedium } from "lucide-react"
import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <div className='w-full bg-pink-100 flex flex-row gap-8 p-5'>
        FR
        <SunMedium />
        <Button>S'inscrire</Button>
        <Button>Se connecter</Button>
    </div>
  )
}

export default Header