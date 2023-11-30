'use client'

import { addHours, eachHourOfInterval, format } from 'date-fns'

import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from 'next-auth/react'
import axios from 'axios'

const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const hours = eachHourOfInterval({
  start: new Date().setHours(0),
  end: addHours(new Date().setHours(0), 24)
}).map(date => format(date, 'HH:mm'))
const defaultHours = ['08:00', '18:00']
const defaultDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']

interface IFormValues {
  startHour: string
  endHour: string
}

export default function Page() {
  const router = useRouter()
  const { data } = useSession()

  const [daysOfWeek, setDaysOfWeek] = useState<string[]>(defaultDays)
  const [selectedHourStart, setSelectHourStart] = useState<string>(defaultHours[0])
  const [selectedHourEnd, setSelectHourEnd] = useState<string>(defaultHours[1])


  const handleToggleDaysOfWeek = (day: string) => {
    if(daysOfWeek.includes(day)) {
      setDaysOfWeek(daysOfWeek.filter(dayOfWeek => dayOfWeek !== day))
    } else {
      setDaysOfWeek([...daysOfWeek, day])
    }
  }

  const handleOnSubmit = async (event: any) => {
    event.preventDefault()
    
    if (selectedHourStart > selectedHourEnd) {
      alert('Hora de inicio maior que hora de fim.')
      return
    }
  
    if (daysOfWeek.length === 0) {
      alert('Selecione pelo menos um dia da semana')
      return
    }

    const response = await axios.post('/api/schedules', {
      data: {
        days: daysOfWeek,
        hour_start: selectedHourStart,
        hour_end: selectedHourEnd,
        email: data?.user?.email
      }
    })

    if (response.status === 201) {
      router.push('/register/step/two')
    }
  }


  return (
    <div id="container" className="h-full flex flex-col px-4 py-6">
      <div className="flex justify-center">
        <img src="/logo.svg" />
      </div>

      <div className="mt-10">
        <h3 className="text-lg leading-normal text-primary font-semibold">{data?.user?.name}, bem-vindo 👋</h3>

        <p className="text-sm leading-normal text-secondary italic font-normal text-center mt-10">
          Informe o horário de início e fim para agilizar o<br/>
          cadastro. Você poderá ajustá-los como preferir<br/>
          após o término.
        </p>
      </div>

      <div className="mt-14 flex justify-between">
        <div className="flex flex-col">
          <label className="text-sm text-primary leading-normal">HORA INÍCIO</label>
          <select 
            onChange={(event) => {
              setSelectHourStart(event.currentTarget.value)
            }}
            value={selectedHourStart}
            className="mt-1 border border-secondary rounded h-12 w-[150px] bg-transparent outline-none focus:border-green1 appearance-none pl-4 text-smleading-normal"
          >
            {hours.map((hour, index) => (
              <option key={index} className="text-primary" value={hour}>{hour}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-primary leading-normal">HORA FIM</label>
          <select
            onChange={(event) => {
              setSelectHourEnd(event.currentTarget.value)
            }}
            value={selectedHourEnd}
            className="mt-1 border border-secondary rounded h-12 w-[150px] bg-transparent outline-none focus:border-green1 appearance-none pl-4 text-sm leading-normal"
          >
            {hours.map((hour, index) => (
              <option key={index} className="text-primary" value={hour}>{hour}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="border border-secondary rounded w-full mt-7 py-4">
        {days.map((day, index) => (
          <>
            <div key={index} className="pl-4 text-sm text-primary font-light italic leading-normal space-x-4">
              <input type="checkbox" checked={daysOfWeek.includes(day)} onChange={() => handleToggleDaysOfWeek(day)}/>
              <label>{day}</label>
            </div>
            <div className='h-[1px] w-full bg-secondary my-4 last:sr-only'/>
          </>
        ))}
      </div>

      <div className="py-6 flex justify-end">
        <button
          type="submit" 
          onClick={(event) => handleOnSubmit(event)}
          className="w-[216px] h-12 bg-primary hover:to-btn-hover text-white text-base font-semibold leading-normal rounded-xl">
          Continuar
        </button>
      </div>
    </div>
  )
}
