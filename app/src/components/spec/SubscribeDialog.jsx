import React , { useState } from "react";

import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import { username_validation , email_validation , password_validation } from "../../utils/ValidationUtils";
import { userRegister } from "../../hooks/Auth";

const SubscribeDialog = () => {

    const [ username , setUsername ] = useState('');
    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');
    const [ confirm_password , setConfirmPassword ] = useState('');
    const [ dialogOpen , setDialogOpen ] = useState(false);
    
    const { toast } = useToast();

    const handleSubmit = async () =>
    {   
        if (!username_validation(username))
        {
            toast({
                title : 'Nom d' + `\'` + 'utilisateur invalide',
                description : 'Le nom d' + `\'` + 'utilisateur est invalide.\nIl doit y avoir entre 3 et 20 caractères.\nCaractères autorisés : A...Z, a...z, 0...9, _',
                variant : 'destructive'
            })
        } else if (!email_validation(email))
        {
            toast({
                title : 'Email invalide',
                description : 'L' + `\'` + 'adresse mail est invalide.',
                variant : 'destructive'
            })
        } else  if (!password_validation(password))
        {
            toast({
                title : 'Mot de passe invalide',
                description : 'Le mot de passe est invalide.\n- 8 caractères minimum.\n- 1 lettre majuscule.\n- 1 lettre minuscule.\n- 1 chiffre.\n- 1 caractère spécial (@,$,%,*,?,&).',
                variant : 'destructive'
            })
        } else if (password !== confirm_password)
        {
            toast({
                title : 'Mot de passe invalide',
                description : 'Les deux mots de passe doivent correspondrent',
                variant : 'destructive'
            })
        } else {
            let { success , response , error } = await userRegister({ username : username , email : email , password : password , confirm_password : confirm_password });
            if (success)
            {
                toast({
                    title : 'Inscription réussie !',
                    description : 'Check ta boîte de récéption, un mail a été envoyé pour valider ton adresse mail. Tu peux maintenant te connecter !',
                    variant : 'default'
                })
                setDialogOpen(false);
            } else 
            {
                toast({
                    title : 'Echec de l' + `\'` + 'inscruption',
                    description : error,
                    variant : 'destructive'
                })
            }
        }
    }

    return (
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger asChild>
                <Button>S'inscrire</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-pink-100'>
                <div className='grid gap-4'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Inscription</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className='grid gap-4'>
                        <div className='grid gap-2'>
                            <Label>Nom d'utilisateur</Label>
                            <Input id='username' placeholder={'Nom d' + `\'` + 'utilisateur'} value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className='grid gap-2'>
                            <Label>Adresse mail</Label>
                            <Input id='email' type='email' placeholder='m@example.com' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className='grid gap-2'>
                            <Label>Mot de passe</Label>
                            <Input id='password' type='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className='grid gap-2'>
                            <Label>Confirmer le mot de passe</Label>
                            <Input id='password_conf' type='password' placeholder='Confirmation mot de passe' value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} required />
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

export default SubscribeDialog