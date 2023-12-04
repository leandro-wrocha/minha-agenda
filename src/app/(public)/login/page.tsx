'use client'

import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const { data, status } = useSession()
  const router = useRouter()
  
  const registerUser = async () => {
    
    try {
      const response = await axios.post('/api/users', {
        data: {
          name: data?.user?.name,
          email: data?.user?.email,
          refresh_token: data?.refresh_token,
          register_steps: 0
        }
      })
  
      if (response.status === 201) {
        router.push('/register/step/one')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      registerUser()
      // router.push('/dashboard')
    }
  }, [status])

  return (
    <div id="container" className="h-full flex items-center justify-center">
      <button
        onClick={() => signIn('google')} 
        className="max-w-[216px] w-full h-12 rounded-xl text-white text-base font-semibold bg-primary hover:bg-btn-hover"
      >
        Entrar com Google
      </button>
    </div>
  )
}
