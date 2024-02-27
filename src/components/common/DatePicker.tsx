"use client"
import React,{ useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker,DateRange } from 'react-date-range';


export default function DatePicker({state,dateChangeCallback}:{state:any,dateChangeCallback:(data:any)=>void}) {

  return (
    <div>
       <div className='hidden md:block'>
      <DateRangePicker
      onChange={dateChangeCallback}
      moveRangeOnFirstSelection={false}
      months={1}
      ranges={state}
      />
      </div>
      
      <div className='md:hidden'>
      <DateRange
      onChange={dateChangeCallback}
      moveRangeOnFirstSelection={false}
      months={1}
      ranges={state}
      />
      </div>

    </div>
  )
}
