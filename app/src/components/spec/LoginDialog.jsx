import React , { useState } from "react";

import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { email_validation } from "../../utils/ValidationUtils";
import { userLogin } from "../../hooks/Auth";

const LoginDialog = () => {

    const [ login , setLogin ] = useState('');
    const [ password , setPassword ] = useState('');
    const [ dialogOpen , setDialogOpen ] = useState(false);
    
    let username = ''
    let email = ''

    const handleSubmit = async () =>
    {   
        if (!email_validation(login))
        {
            username = login;
        } else {
            email = login;
        }

        let { success , response , error } = await userLogin({ username : username , email : email, password : password });
        if (!success)
        {
            toast({
                title : 'Echec de la connexion',
                description : error,
                variant : 'destructive'
            })
        } else {
            setDialogOpen(false);
        }
    }

    return (
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger asChild>
                <Button>Se connecter</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-pink-100'>
                <div className='grid gap-4'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Se connecter</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className='grid gap-4'>
                        <div className='grid gap-2'>
                            <Label>Nom d'utilisateur/Email</Label>
                            <Input id='login' placeholder={'Nom d' + `\'` + 'utilisateur ou email'} value={login} onChange={(e) => setLogin(e.target.value)} required />
                        </div>
                        <div className='grid gap-2'>
                            <Label>Mot de passe</Label>
                            <Input id='password' type='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button onClick={() => handleSubmit()}>Continue</Button>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LoginDialog;