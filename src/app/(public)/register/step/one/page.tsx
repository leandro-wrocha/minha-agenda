'use client'

import { addHours, eachHourOfInterval, format } from 'date-fns'

import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"

const hours = eachHourOfInterval({
  start: new Date(),
  end: addHours(new Date(), 20)
}).map(date => format(date, 'HH:mm'))
const days = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom']
const defaultHours = ['08:00', '18:00']


interface IFormValues {
  startHour: string
  endHour: string
}


export default function Page() {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<IFormValues>()

  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([])
  const [selectStartDate, setSelectStartDate] = useState<Date>(new Date())

  const handleToggleDaysOfWeek = (day: string) => {
    if(daysOfWeek.includes(day)) {
      setDaysOfWeek(daysOfWeek.filter(dayOfWeek => dayOfWeek !== day))
    } else {
      setDaysOfWeek([...daysOfWeek, day])
    }
  }

  const handleOnSubmit = (values: IFormValues) => {
    alert(`${values.startHour}, ${values.endHour}, ${daysOfWeek}, ${selectStartDate}`)

    router.push('/register/steps/two')
  }


  return (<h1>replace</h1>)
}
