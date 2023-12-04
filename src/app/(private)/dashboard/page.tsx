'use client'

<<<<<<< HEAD
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
=======
import { useSession } from "next-auth/react"
>>>>>>> a936d0d0fd58407e9eb75f73f4e8d33844d99d12

export default function Page() {
  const { data } = useSession()

  const getInfo = async () => {
    const response = await axios.post('/api/bookings', {
      data: {
        refresh: data?.refresh_token
      }
    })

    console.log(response.status)
  }

  useEffect(() => {
    getInfo()
  }, [data?.user])

  return (
    <div id="container" className="h-full flex flex-col px-4 py-6">
      <div className="flex justify-start">
        <img src="/logo.svg" />
      </div>

      <div className="mt-10">
        <h3 className="text-lg leading-normal text-primary font-semibold">{data?.user?.name}, bem-vindo 👋</h3>

        <p className="text-sm leading-normal text-primary italic font-medium text-center mt-10">
          Compartilhe sua agenda com todos!!! <span className="not-italic">😉🤗</span>
        </p>
      </div>
    </div>
  )
}