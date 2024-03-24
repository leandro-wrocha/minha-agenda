'use client';

import { useState } from "react";
import { translate } from "../helpers/translate"
import { addHours, eachMinuteOfInterval, format } from "date-fns";

// constante
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const hours = eachMinuteOfInterval({
  start: new Date().setHours(0,0,0),
  end: addHours(new Date(), 12)
}, { step: 30 }).map(item => format(item, "HH:mm"));

interface IService {
  name: string;
  timeInSeconds: number;
}

const defaultService: IService = {
  name: "",
  timeInSeconds: 900
}

export default function Page() {
  const [daysSelect, setDaysSelect] = useState<string[]>([]);
  const [hourStart, setHourStart] = useState<string>('08:00');
  const [hourEnd, setHourEnd] = useState<string>('18:00');
  const [services, setServices] = useState<IService[]>([defaultService]);
  
  // actions
  const handleDaySelect = (day: string) => {
    if (daysSelect.includes(day)) {
      const daysSelectTemp = daysSelect.filter(item => item != day);

      setDaysSelect(daysSelectTemp);
    } else {
      const daysSelectTemp = [...daysSelect, day];
      
      setDaysSelect(daysSelectTemp);
    }
  }

  const handleHourStart = (hour: string) => {
    setHourStart(hour);
  }

  const handleHourEnd = (hour: string) => {
    setHourEnd(hour);
  }

  const handleServiceName = (name: string, position: number) => {
    let servicesTemp = services.map((service, index) => {
      if (index === position) {
        return { ...service, name };
      }

      return service;
    })

    setServices(servicesTemp);
  }

  const handleServiceTimeInSeconds = (seconds: number, position: number) => {
    let servicesTemp = services.map((service, index) => {
      if (index === position) {
        return { ...service, timeInSeconds: seconds }
      }

      return service;
    })

    setServices(servicesTemp);
  }

  const handleAddServices = () => {
    let servicesTemp = services.slice();
    servicesTemp = [...servicesTemp, defaultService];

    setServices(servicesTemp);
  }
  const handleRemoveServices = (indexToRemove: number) => {
    let servicesTemp = services.slice();
    servicesTemp = servicesTemp.filter((item, index) => index != indexToRemove);

    setServices(servicesTemp);
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[700px]">
        <ul className="flex gap-3">
          {days.map(day => (
            <li key={day} className="flex justify-center items-center gap-1">
              <input type="checkbox" checked={daysSelect.includes(day)} onChange={() => handleDaySelect(day)}/>
              {translate(day)}
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="text-center">
            <span>Selecione o horário de abertura e fechamento</span><br/>
            <span className="text-sm text-[#333]">*após finalizar registro, você pode ajustar todos os horários*</span>
          </div>

          <select
            className="max-w-[150px] w-full h-8"
            onChange={(event) => handleHourStart(event.currentTarget.value)}
            defaultValue={hourStart}
          >
            {hours.map((item, index) => (
              <option key={index} value={item}> {item} </option>
            ))}
          </select>

          <select 
            className="max-w-[150px] w-full h-8"
            onChange={(event) => handleHourEnd(event.currentTarget.value)}
            defaultValue={hourEnd}
          >
            {hours.map((item, index) => (
              <option key={index} value={item}> {item} </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="text-center">
            <span>Insira pelo menos um de seus serviços</span><br/>
            <span className="text-sm text-[#333]">*determine um valor apróximado do tempo de execução do seu serviço*</span>
          </div>

          <div>
            <ul className="flex flex-col items-center">
              {services.map((item, index) => (
                <li className="flex gap-2" key={index}>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="border item.namborder-[#333] rounded-sm max-w-[200px] h-8 pl-2"
                    placeholder="nome do serviço"
                    value={item.name}
                    onChange={(event) => handleServiceName(event.currentTarget.value, index)}
                  />
                  <select 
                    className="h-8"
                    defaultValue={item.timeInSeconds}
                    onChange={(event) => handleServiceTimeInSeconds(Number(event.currentTarget.value), index)}
                    name="timeinseconds"
                    id="timeinseconds"
                  >
                    <option value={900}>15 min</option>
                    <option value={1800}>30 min</option>
                    <option value={3600}>1h</option>
                    <option value={5400}>1h 30 min</option>
                    <option value={7200}>2h</option>
                    <option value={9000}>2h 30 min</option>
                    <option value={10800}>3h</option>
                    <option value={12600}>3h 30 min</option>
                  </select>

                  <button
                    type="button"
                    className="font-bold text-lg ml-4"
                    onClick={() => handleAddServices()}
                  >
                    +
                  </button>

                  {services.length > 1 && (
                    <button
                      type="button"
                      className="font-bold text-lg ml-4"
                      onClick={() => handleRemoveServices(index)}
                    >
                      x
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}