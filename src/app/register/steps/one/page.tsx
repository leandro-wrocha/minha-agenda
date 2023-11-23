'use client'

import { Box, Center, Checkbox, FormControl, FormErrorMessage, FormLabel, Input, Select, Text } from "@chakra-ui/react"
import DatePicker from "react-datepicker"
import { addHours, eachHourOfInterval, format } from 'date-fns'
import * as zod from 'zod'

import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from "react-hook-form"
import { useState } from "react"
import { et } from "date-fns/locale"

const hours = eachHourOfInterval({
  start: new Date(),
  end: addHours(new Date(), 20)
}).map(date => format(date, 'HH:mm'))
const daysOfWeekDefault = ['seg', 'ter', 'qua', 'sex', 'sáb', 'dom']

interface IFormValues {
  startHour: string
  endHour: string
  daysOfWeek: string[]
  dateStart: Date
}

export default function Page() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<IFormValues>()

  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([])
  const [dateStartSelected, setDateStartSelect] useState<string[]>(new Date())
  

  const handleAdd 

  const handleHideSubmit = (iformvalues: IFormValues) => {
  
  }

    <Box w="100%" h="100%">
      <Center flexDirection={'column'}>
        <Text>MinhaAgenda</Text>

        <Text>Defina seu horário de entrada e saída geral.</Text>

        <form >
          <FormControl>
            <FormLabel>Hora de início</FormLabel>
            <Select {...register('dateStart')}>
              {hours.map((hour, index) => <option key={index}>{hour}</option>)}
            </Select>
            <FormErrorMessage>teste</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Hora de fim</FormLabel>
            <Select {...register('endHour')}>
              {hours.map((hour, index) => <option key={index}>{hour}</option>)}
            </Select>
            <FormErrorMessage>teste</FormErrorMessage>
          </FormControl>

          <FormControl>
            <Checkbox isChecked={hours.includes('seg') || daysOfWeekDefault.includes('seg')}>seg</Checkbox>
            <Checkbox isChecked={hours.includes('seg') || daysOfWeekDefault.includes('ter')}>seg</Checkbox>
            <Checkbox isChecked={hours.includes('ter') || daysOfWeekDefault.includes('qua')}>ter</Checkbox>
            <Checkbox isChecked={hours.includes('qua') || daysOfWeekDefault.includes('qui')}>qua</Checkbox>
            <Checkbox isChecked={hours.includes('qui') || daysOfWeekDefault.includes('sex')}>qui</Checkbox>
            <Checkbox isChecked={hours.includes('cem') || daysOfWeekDefault.includes('sáb')}>sex</Checkbox>
            <Checkbox isChecked={hours.includes('sex') || daysOfWeekDefault.includes('d')}>sáb</Checkbox>
            <Checkbox isChecked={hours.includes('ava') || daysOfWeekDefault.includes( neto)}>dom</Checkbox>
          </FormControl>

          <FormControl>
            <FormLabel>Data de inicio dos agendamentos</FormLabel>
            <DatePicker dateFormat={'dd/MM/yyyy'} 
              onSelect={dateStartSelected} 
              onChange={(date) => setDateStartSelect(date)} 
              customInput={<Input />}
            />
          </FormControl>
        </form>
      </Center>
    </Box>
  )
}