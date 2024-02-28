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
      <AlertDialogTitle>Comming Soon ...</AlertDialogTitle>
      <AlertDialogDescription>
        This feature is currently in testing soon to be updated
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction disabled>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>    
  )
}
