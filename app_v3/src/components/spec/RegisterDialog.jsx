import React , { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs , TabsContent , TabsList , TabsTrigger } from "@/components/ui/tabs";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { username_validation , email_validation , password_validation } from "../../utils/ValidationUtils";
import { userLogin , userRegister } from "../../hooks/Auth";
import { CookieContext } from "@/context/CookieContext";

const RegisterDialog = () => 
{

    // LOGIN VARIABLE

    const [ login , setLogin ] = useState('');
    const [ password , setPassword ] = useState('');
    const [ dialogOpen , setDialogOpen ] = useState(false);
    const { fetchLogCookie } = useContext(CookieContext);

    let username = null
    let email = null
    
    // REGISTER VARIABLE

    const [ reg_username , setRegUsername ] = useState('');
    const [ reg_email , setRegEmail ] = useState('');
    const [ reg_password , setRegPassword ] = useState('');
    const [ reg_confirm_password , setRegConfirmPassword ] = useState('');

    const { toast } = useToast();

    const handleSubmitLogin = async () =>
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
            await fetchLogCookie();
            setDialogOpen(false);
        }
    }

    const handleSubmitRegister = async () =>
    {   
        if (!username_validation(reg_username))
        {
               toast({
                   title : 'Nom d' + `\'` + 'utilisateur invalide',
                   description : 'Le nom d' + `\'` + 'utilisateur est invalide.\nIl doit y avoir entre 3 et 20 caractères.\nCaractères autorisés : A...Z, a...z, 0...9, _',
                   variant : 'destructive'
               })
        } else if (!email_validation(reg_email))
        {
               toast({
                   title : 'Email invalide',
                   description : 'L' + `\'` + 'adresse mail est invalide.',
                   variant : 'destructive'
               })
        } else  if (!password_validation(reg_password))
        {
               toast({
                   title : 'Mot de passe invalide',
                   description : 'Le mot de passe est invalide.\n- 8 caractères minimum.\n- 1 lettre majuscule.\n- 1 lettre minuscule.\n- 1 chiffre.\n- 1 caractère spécial (@,$,%,*,?,&, !, #, ^, ~, _, -, +, =, |, (, ), [, ], {, }, <, >, €, £, ¥, ₩, ฿, ₿).',
                   variant : 'destructive'
               })
        } else if (reg_password !== reg_confirm_password)
        {
               toast({
                   title : 'Mot de passe invalide',
                   description : 'Les deux mots de passe doivent correspondrent',
                   variant : 'destructive'
               })
        } else {
            let { success , response , error } = await userRegister({ username : reg_username , email : reg_email , password : reg_password , confirm_password : reg_confirm_password });
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
                      title : 'Echec de l' + `\'` + 'inscription',
                      description : error,
                      variant : 'destructive'
                  })
            }
        }
    }

    return (
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger asChild>
                <Button className='bg-card text-dtext text-xl p-6 rounded-3xl hover:text-mWhite font-thunder font-bold align-middle hover:bg-hl hover:border-hl'>Se connecter</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-bg border-hl rounded-xl shadow-hl shadow-lg'>
                <Tabs defaultValue="register">
                    <TabsList className='w-full mb-4 bg-bg text-ltext border-hl border-2 rounded-xl'>
                        <TabsTrigger className='w-full rounded-xl text-dtext data-[state=active]:bg-hl' value="register">S'inscrire</TabsTrigger>
                        <TabsTrigger className='w-full rounded-xl text-dtext data-[state=active]:bg-hl' value="login">Se connecter</TabsTrigger>
                    </TabsList>
                    <TabsContent value="register">
                    <div className='grid gap-4'>
                        <div className='grid gap-4'>
                                <div className='grid gap-2'>
                                    <Label className='text-hl'>Nom d'utilisateur</Label>
                                    <Input className='text-dtext bg-card rounded-xl' id='username' placeholder={'Nom d' + `\'` + 'utilisateur'} value={reg_username} onChange={(e) => setRegUsername(e.target.value)} required />
                                </div>
                                <div className='grid gap-2'>
                                    <Label className='text-hl'>Adresse mail</Label>
                                    <Input className='text-dtext bg-card rounded-xl' id='email' type='email' placeholder='m@example.com' value={reg_email} onChange={(e) => setRegEmail(e.target.value)} required />
                                </div>
                                <div className='grid gap-2'>
                                    <Label className='text-hl'>Mot de passe</Label>
                                    <Input className='text-dtext bg-card rounded-xl' id='password' type='password' placeholder='Mot de passe' value={reg_password} onChange={(e) => setRegPassword(e.target.value)} required />
                                </div>
                                <div className='grid gap-2'>
                                    <Label className='text-hl'>Confirmer le mot de passe</Label>
                                    <Input className='text-dtext bg-card rounded-xl' id='password_conf' type='password' placeholder='Confirmation mot de passe' value={reg_confirm_password} onChange={(e) => setRegConfirmPassword(e.target.value)} required />
                                </div>
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel className='rounded-xl bg-card'>Cancel</AlertDialogCancel>
                                <Button className='bg-hl  text-dtext hover:text-hl hover:bg-bg hover:border-hl border-2 border-hl rounded-xl' onClick={() => handleSubmitRegister()}>Continue</Button>
                            </AlertDialogFooter>
                        </div>
                    </TabsContent>
                    <TabsContent value="login">
                        <div className='grid gap-4'>
                            <div className='grid gap-4'>
                                <div className='grid gap-2'>
                                    <Label className='text-hl'>Nom d'utilisateur/Email</Label>
                                    <Input className='text-dtext bg-card rounded-xl' id='login' placeholder={'Nom d' + `\'` + 'utilisateur ou email'} value={login} onChange={(e) => setLogin(e.target.value)} required />
                                </div>
                                <div className='grid gap-2'>
                                    <Label className='text-hl'>Mot de passe</Label>
                                    <Input className='text-dtext bg-card rounded-xl' id='password' type='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel className='rounded-xl'>Cancel</AlertDialogCancel>
                                <Button className='bg-hl text-dtext hover:text-hl hover:bg-bg hover:border-hl border-2 border-hl rounded-xl' onClick={() => handleSubmitLogin()}>Continue</Button>
                            </AlertDialogFooter>
                        </div>
                    </TabsContent>
                </Tabs>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default RegisterDialog;