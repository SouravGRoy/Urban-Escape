"use client"
import React, {useState} from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from 'next/navigation';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { X } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { LoginSchema, LoginType } from '../../../validations/authShema'
import { createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import SocialBtns from './SocialBtns';
  

export default function LoginModal() {
    const [open , setOpen]=useState<boolean>(false);
    const [loading , setLoading]=useState<boolean>(false);
    const supabase = createClientComponentClient()
    const router = useRouter()
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<LoginType>({
      resolver: yupResolver(LoginSchema),
    })
    const onSubmit = async(payload:LoginType) => {
      setLoading(true)
      const {data , error} = await supabase.auth.signInWithPassword({
        email:payload.email,
        password:payload.password,
        
      });
      setLoading(false)
      if(error){
        toast.error(error.message,{theme:"colored"})
      }else if(data.user){
        setOpen(false);
        router.refresh();
        toast.success("Logged in successfully!", {theme:"colored"})
     }
    }
  return (
    <>
              <AlertDialog open={open}>
    <AlertDialogTrigger asChild>
<li className='hover:bg-gray-200 rounded-md p-2 cursor-pointer' onClick={()=>setOpen(true)}>
    Login
</li>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle asChild>
            <div className='flex justify-between items-center'>
                <span >
                    Login
                </span>
                <X onClick={()=>setOpen(false)} className='cursor-pointer'/>
            </div>
        </AlertDialogTitle>
        <AlertDialogDescription asChild>
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className='text-xl font-bold text-center'>Welcome to UrbanEscape</h1>
         {/* Login */}
         <div className='mt-5'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' {...register("email")} placeholder='Enter your email'/>
            <span className='text-red-400'>
              {errors.email?.message}
            </span>
         </div>
         <div className='mt-5'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' type='password' {...register("password")} placeholder='Enter your password'/>
            <span className='text-red-400'>
              {errors.password?.message}
            </span>
         </div>
         <div className='mt-5'>
            <Button className='bg-brand w-full' disabled={loading}>{loading ? "processing🗿" : "Continue"}</Button>
         </div>
         <h1 className='text-center my-2 text-lg font-bold'>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ OR ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</h1>
         </form>
         <SocialBtns/>

        </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
    </>
   
  
  )
}
