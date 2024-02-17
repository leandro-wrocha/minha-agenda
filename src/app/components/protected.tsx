'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Home } from "../home";
import { useEffect, useState } from "react";
import axios from "axios";

export const Protected = () => {
  const session = useSession()
  
  const [registerStep, setRegisterStep] = useState(0);

  const getUserInfo = async () => {
    if (session.status == 'authenticated') {
      const response = await axios.get('/api/users', {
        params: {
          email: session.data?.user?.email
        }
      });


      setRegisterStep(response.data.userReturn.step);
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [session, registerStep]);

  return (
      <main className="h-screen" >
        { session.status === 'authenticated' ? 
            registerStep == 1 ? 
              redirect('/register/step/one')
              : registerStep == 2 ? redirect('register/step/two')
              : registerStep == 3 && redirect('/new-dashboard')
          : <Home />
        }
      </main>
  )
}
