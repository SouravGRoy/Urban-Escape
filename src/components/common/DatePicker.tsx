"use client"
import React,{ useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';


export default function DatePicker() {

const [state,setState] = useState([
    {
    startDate:new Date(),
    endDate:addDays(new Date(),7),
    key:'selection'
},

])

const handleDateChange=(data:any)=>{
    setState([data?.selection])
}
  return (
    <div>
      <DateRangePicker
      onChange={handleDateChange}
      moveRangeOnFirstSelection={false}
      months={1}
      ranges={state}
      />
    </div>
  )
}
