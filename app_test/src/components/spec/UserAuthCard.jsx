import React , { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader , CardTitle } from "@/components/ui/card"

import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

import { userRegister , userLogin } from '../../hooks/Authentication'

const UserAuthCard = () => 
{
    let [ username , setUsername ] = useState('');
    let [ email, setEmail ] = useState('');
    let [ password, setPassword ] = useState('');
    let [ confirmPassword, setConfirmPassword ] = useState('');
    
    const { toast } = useToast();
    
    let username_validation = (username) =>
    {
        if (username.length < 3 || username.length > 20)
        {
            return false;
        }
        const regex = /^[A-Za-z0-9_]+$/;
        if (!regex.test(username))
        {
            return false;
        }
        return true;
    }
    
    let email_validation = (email) =>
    {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email))
        {
            return false;
        }
        return true;
    }
    
    let password_validation = (password) =>
    {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(password))
        {
            return false;
        }
        return true;
    }
    
    let handleRegister = (username, email, password, confirmPassword) =>
    {
        if (!username_validation(username))
        {
            toast({
                title : 'Register error',
                description : 'Username is invalid.\nMust have between 3 and 20 characters.\nOnly letter or number or underscore.',
                variant : 'destructive'
            })
        } else if (!email_validation(email))
        {
            toast({
                title : 'Register error',
                description : 'Email is invalid',
                variant : 'destructive'
            })
        } else if (!password_validation(password))
        {
            toast({
                title : 'Register error',
                description : 'Password is invalid',
                variant : 'destructive'
            })
        } else if (password !== confirmPassword)
        {
            toast({
                title : 'Register error',
                description : 'Password confirmation must be equal to password',
                variant : 'destructive'
            })
        } else {
            toast({
                title : 'Connexion to server',
                description : 'Trying to register you',
                variant : 'default'
            })
        }
    }
    
    let handleLogin = (username, email, password) =>
    {
        console.log('Login with : ')
        console.log(username)
        console.log(email)
        console.log(password)
    }
    
    return (
      <Card className="rounded-xl border-solid border-2 gap-6 flex flex-col" x-chunk="charts-01-chunk-0">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-4xl tabular-nums">User Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="register" className="w-full flex flex-col gap-4">
              <TabsList className='rounded-xl w-52'>
                <TabsTrigger className='rounded-xl' value="register">S'inscrire</TabsTrigger>
                <TabsTrigger className='rounded-xl' value="login">S'identifier</TabsTrigger>
              </TabsList>
              <TabsContent value="register" className="flex flex-col gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input className="rounded-xl" id="username" type="username" placeholder="Username"  value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input className="rounded-xl" id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input className="rounded-xl" id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="passwordConfirm">Confirm Password</Label>
                  <Input className="rounded-xl" id="passwordConfirm" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <Button onClick={() => handleRegister(username, email, password, confirmPassword)} className="rounded-xl">Confirm</Button>
              </TabsContent>
              <TabsContent value="login" className="flex flex-col gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button onClick={() => handleLogin(username, username, password)} className="rounded-xl">Confirm</Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
    )
}

export default UserAuthCard