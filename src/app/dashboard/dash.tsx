'use client'

import { addHours, eachMinuteOfInterval, format } from "date-fns"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form";

type Service = {
  name: string,
  time_executation_in_minutes: number,
}

const initialState = [
  { name: '', time_executation_in_minutes: 30 },
  { name: '', time_executation_in_minutes: 60 },
  { name: '', time_executation_in_minutes: 90 },
];

export default function Dashboard() {
  const days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']
  const time = eachMinuteOfInterval({
    start: new Date().setHours(0, 0, 0),
    end: addHours(new Date().setHours(0), 23)
  }, {
    step: 30
  }).map(date => format(date, 'HH:mm'))

  const [daysSelected, setDaysSelected] = useState<string[]>([]);
  const [services, setServices] = useState<Service[]>(initialState);

  const handleToggleDays = (day: string) => {
    if (daysSelected.includes(day)) {
      setDaysSelected((prevState) => prevState.filter(item => item !== day))
    } else {
      setDaysSelected((prevState) => [...prevState, day])
    }
  }

  const handleToggleServices = (indexTo?: number) => {
    if (indexTo) {
      setServices([{ name: 'kokok', time_executation_in_minutes: 90 }]);
    }
  }

  const changeNameOfService = (name: string, index: number) => {
    const servicesTemp = services
    servicesTemp[index].name = name

    setServices(servicesTemp)
  }

  const changeTimeExecutationInMinutes = (time: number, index: number) => {
    const servicesTemp = services
    servicesTemp[index].time_executation_in_minutes = time

    setServices(servicesTemp)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    return
  }

  const { control, register } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "test", // unique name for your Field Array
  });

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          {days.map(day => (
            <button 
              className={`border ${daysSelected.includes(day) ? 'border-blue-600' : 'border-gray-700'}`}
              onClick={() => handleToggleDays(day)}
              key={day}
            >
                {day.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <select className="h-8 border border-gray-700 outline-none" defaultValue={'08:00'}>
            {time.map(item => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
          <select className="h-8 border border-gray-700 outline-none" defaultValue={'18:00'}>
            {time.map(item => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <span>crie ao menos um serviço</span>

          <div className="flex flex-col">
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                  // important to include key with field's id
                {...register(`test.${index}.value`)}
                className="border border-gray-700"
              />
            <button onClick={() => remove(index)}>remove</button>
            </div>
          ))}
          <button onClick={() => insert(1, 'teste')}>adicionar</button>
        </div>

        <button type="submit">finalizar</button>
      </form>
    </main>
  )
}
