'use client'

import { signIn } from 'next-auth/react'

export const CallLoginWithGoogle = () => {
  return (
    <button 
      className="bg-[#72CC00] text-white font-bold h-12 px-8 rounded-xl hover:bg-[#56B000]"
      onClick={() => signIn('google')}
    >
      Entrar com Google
    </button>
  )
}
