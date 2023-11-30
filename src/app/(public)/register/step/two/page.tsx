'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

interface IService {
  name: string
  value: string
  time: string
}

const minutes = ['15', '30', '45', '60', '75', '90', '105', '120', '135', '150', '165']

export default function Page () {
  const { data } = useSession()

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

  return (
    <div id="container" className="h-full flex flex-col px-4 py-6">
      <div className="flex justify-center">
        <img src="/logo.svg" />
      </div>

      <div className="mt-10">
        <h3 className="text-lg leading-normal text-primary font-semibold">{data?.user?.name}, bem-vindo 👋</h3>

        <p className="text-sm leading-normal text-secondary italic font-normal text-center mt-10">
          Adicione ao menos um serviço para iniciar seus<br/>
          agendamentos.
        </p>
      </div>

      <div>
        <div className="flex flex-col">
          <label className="text-sm text-primary leading-normal">NOME DO SERVIÇO</label>
          <input 
            className="mt-1 border border-secondary rounded h-12 w-[150px] bg-transparent outline-none focus:border-green1 appearance-none pl-4 text-smleading-normal"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-primary leading-normal">DESCRIÇÃO DO SERVIÇO (opicional)</label>
          <input 
            className="mt-1 border border-secondary rounded h-12 w-[150px] bg-transparent outline-none focus:border-green1 appearance-none pl-4 text-smleading-normal"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-primary leading-normal">VALOR DO SERVIÇO</label>
          <input 
            className="mt-1 border border-secondary rounded h-12 w-[150px] bg-transparent outline-none focus:border-green1 appearance-none pl-4 text-smleading-normal"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-primary leading-normal">TEMPO DE EXECUÇÃO</label>
          <select 
            className="mt-1 border border-secondary rounded h-12 w-[150px] bg-transparent outline-none focus:border-green1 appearance-none pl-4 text-smleading-normal"
          >
          </select>
        </div>
      </div>
    </div>
  )
}
