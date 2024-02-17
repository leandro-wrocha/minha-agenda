'use client'

import { signIn } from "next-auth/react"

// login sem a janela como popup por enquanto
export const CallLoginWithGoogle = () => {

  return (
    <button 
      className="bg-[#4BB05B] text-white font-bold h-10 px-6 rounded-xl text-sm"
      onClick={() => signIn("google")}
    >
      Entrar com Google
    </button>
  )
}
