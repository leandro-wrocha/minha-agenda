'use client'

import { useSession } from "next-auth/react"
import { useState } from "react"
import { Plus, Trash2 } from 'lucide-react'
import axios from "axios"
import { useRouter } from "next/navigation"

interface IService {
  name: string
  price: string
  time: number
  description?: string
}

export default function Page () {
  const { data } = useSession()
  const router = useRouter()

  const [services, setServices] = useState<IService[]>([
    { name: '', price: '', time: 15, description: '' }
  ])

  const handleAddService = () => {
    setServices(() => [...services, { name: '', price: '', time: 15, description: '' }])
  }

  const handleRemoveService = (serviceToRemove: number) => {
    setServices(() => services.filter((service, index) => serviceToRemove !== index))
  }

  const handleEditService = (service: IService, index: number) => {
    let servicestemp = services
    servicestemp[index] = service

    setServices([...servicestemp])
  }

  const handleOnSubmit = async (event: any) => {
    event.preventDefault()

    if (services.length >= 1) {
      if (services[0].name === '' || services[0].price === '') {
        alert('Cadastre pelo menos um serviço')
      }
    }
    
    const servicesToCreate = services.filter(service => service.name !== '' && service.price !== '')

    try {
      const response = await axios.post('/api/services', {
        data: {
          email: data?.user?.email,
          services: servicesToCreate
        }
      })

      if (response.status === 201) {
        router.push('/dashboard')
      }
    } catch (error) {
      
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
          Adicione ao menos um serviço para iniciar seus<br/>
          agendamentos.
        </p>
      </div>

      <div className="w-full mt-5">
        {services.map((service, index) => (
          <div className="w-full mt-4 first:mt-0" key={index}>
            <div className="w-full flex gap-4">
              <div className="flex flex-col w-full">
                <label className="text-sm text-primary leading-normal">NOME DO SERVIÇO</label>
                <input
                  value={service.name}
                  onChange={(e) => {
                    service.name = e.currentTarget.value

                    handleEditService(service, index)
                  }} 
                  className="mt-1 border border-secondary rounded h-12 w-full bg-transparent outline-none focus:border-green1 appearance-none pl-4 text-smleading-normal"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-sm text-primary leading-normal">VALOR DO SERVIÇO</label>
                <input
                  value={service.price}
                  onChange={(e) => {
                    service.price = e.currentTarget.value

                    handleEditService(service, index)
                  }} 
                  className="mt-1 border border-secondary rounded h-12 w-full bg-transparent outline-none focus:border-green1 appearance-none pl-4 text-smleading-normal"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-sm text-primary leading-normal">TEMPO DE EXECUÇÃO</label>
                <select 
                  value={service.time}
                  onChange={(e) => {
                    service.time = Number(e.currentTarget.value)

                    handleEditService(service, index)
                  }}
                  className="mt-1 border border-secondary rounded h-12 w-full bg-transparent outline-none focus:border-green1 appearance-none pl-4 text-smleading-normal"
                >
                  <option value={15}>15 minutos</option>
                  <option value={30}>30 minutos</option>
                  <option value={45}>45 minutos</option>
                  <option value={60}>1 hora</option>
                  <option value={75}>1 hora e 15 minutos</option>
                  <option value={90}>1 hora e 30 minutos</option>
                  <option value={105}>1 hora e 45 minutos</option>
                  <option value={120}>2 horas</option>
                  <option value={180}>3 horas</option>
                  <option value={240}>4 horas</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col mt-2">
              <label className="text-sm text-primary leading-normal">DESCRIÇÃO DO SERVIÇO (opicional)</label>
              <input 
                value={service.description}
                onChange={(e) => {
                  service.description = e.currentTarget.value

                  handleEditService(service, index)
                }}
                className="mt-1 border border-secondary rounded h-12 w-full bg-transparent outline-none focus:border-green1 appearance-none pl-4 text-smleading-normal"
              />
            </div>
            
            {services.length > 1 && (
              <div className="w-full mt-4">
                <button onClick={() => handleRemoveService(index)} className="w-full h-12 rounded-sm bg-red-600 hover:bg-red-700 text-white font-semibold flex justify-center items-center gap-2">
                  <Trash2 /> Excluir
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full mt-4">
        <button 
          onClick={() => handleAddService()}
          className="h-12 w-full rounded-md bg-primary hover:bg-btn-hover text-white font-semibold flex justify-center items-center gap-2">
          <Plus /> Adicionar
        </button>
      </div>

      <div className="w-full mt-4 flex justify-end">
        <button type="submit" onClick={handleOnSubmit} className="h-12 w-[150px] rounded-md bg-primary hover:bg-btn-hover text-white font-semibold">
          Finalizar
        </button>
      </div>
    </div>
  )
}
