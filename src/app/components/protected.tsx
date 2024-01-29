'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Login } from "./login"
import { Logout } from "./logout"

export const Protected = () => {
  const session = useSession()
  
  return (
    <main className="h-screen" >
      { session.status === 'authenticated' ? redirect('/dashboard') : (
        <div className="h-full flex flex-col justify-center items-center">
          <Login />
          <Logout />
        </div>
      ) }
    </main>
  )
}
