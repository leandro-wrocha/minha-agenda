'use client'

import { useEffect, useState } from "react"

interface IService {
  name: string
  value: string
  time: string
}

const minutes = ['15', '30', '45', '60', '75', '90', '105', '120', '135', '150', '165']

export default function Page () {
  const [services, setServices] = useState<IService[]>([
    { name: '', value: '', time: '15' }
  ])

  const handleAddService = () => {
    setServices(() => [...services, { name: '', value: '', time: '15' }])
  }

  const handleRemove = (index: number) => {
    setServices(() => services.filter((svc, inde) => index !== inde))
  }

  const handleOnSubmit = (event: any) => {
    event.preventDefault()

    if (services.length >= 1) {
      if (services[0].name === '' || services[0].value === '') {
        alert('Cadastre pelo menos um serviço')
      }
    }

    console.log(services.filter(service => service.name !== ''))
  }

  return (<h1>replace</h1>)
}
