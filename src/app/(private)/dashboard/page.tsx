'use client'

import { useSession } from "next-auth/react"

export default function Page() {
  const { data } = useSession()

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