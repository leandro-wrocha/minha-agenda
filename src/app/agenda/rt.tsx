import { addMonths, eachDayOfInterval, eachMinuteOfInterval, lastDayOfMonth, subMonths } from "date-fns"
import { useEffect, useState } from "react"

import 'react-datepicker/dist/react-datepicker.css'

/// o certo é trazer do back qual o horario esta disponivel pelo serviço selecionado
/// e trazer qual o horario de fim de expediente

/** 
 * primeiro selecionar serviço, após isso o calendario irá mostrar todas as datas disponiveis
 * por que existe a possibilidade dele não realizar serviço daquele no dia especifico disponivel
 * e outra que facilita o calculo para mostrar as datas disponiveis.
 * 
 * 
 */

/**
 * 
 * schedules by service do dia X
 * 
 * verificaria o ultimo agendamento para cada serviço
 * e verificaria a disponibilidade para o próximo agendamento, levando em consideração o tempo de execução
 */


const endtime = '18:00'
const schedules = [{start: '09:30', service: '1'}, {start: '10:00', service: '2'}]
const services = [
  { service: '1', value: 'R$ 50,00', time: '30'},
  { service: '2', value: 'R$ 30,00', time: '60'}
]

export default function Page() {
  const daysWork = [4, 5]

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [datesNotWork, setDatesNotWork] = useState<Date[]>([])
  const [dateSelected, setDateSelected] = useState<Date | undefined>()
  const [serviceSelected, setServiceSelected] = useState<string>('')

  const handleChangeMonth = () => {
    const datesOfMonth = eachDayOfInterval({
      start: subMonths(currentMonth, 2),
      end: addMonths(currentMonth, 2)
    })

    setDatesNotWork(() => datesOfMonth.filter(date => date.getDay() !== 4 && date.getDay() !== 5))
  }

  const handleSelectService = () => {
    const times = eachMinuteOfInterval({
      start:  new Date().setHours(9, 30, 0, 0),
      end: new Date().setHours(18, 0, 0, 0),
    }, {
      step: 30
    })
  }

  useEffect(() => {
    handleChangeMonth()
  }, [currentMonth])

  useEffect(() => {
    handleSelectService
  }, [serviceSelected])

  return (
    <h1>replace</h1>
  )
}

/**
  eu registrei dois serviço, o primeiro dura 1h para ser executado o segundo dura 30 minutos

  quando compartilhei minha agenda com o pessoal, estava esperando que isso fosse bem atendido,
  de qual modo, aonde o cliente, possa escolher qualquer horario independente do tipo de serviço

  08:00 de 30m
  08:30

  09:00 de 1h
  10:00

*/