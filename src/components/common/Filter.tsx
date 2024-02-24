import React from 'react'
import { SlidersHorizontal } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

export default function Filter() {
  return (
  <AlertDialog >
  <AlertDialogTrigger>
  <div className='flex mt-4 justify-between items-center border rounded-lg px-4 py-3 hover:shadow-lg space-x-3 transition duration-300'>
    <SlidersHorizontal className='p-1 font-bold '/>
    <h1 className='text-semibold text-md'>Filter</h1>
    </div>
 </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>    
  )
}
