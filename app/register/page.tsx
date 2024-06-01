'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'

import FormPage from '../components/FormPage'
import RegisterForm from './RegisterForm'
import useUserStore from '../state/user-store'

function RegisterPage() {
  const [loading, loggedIn] = useUserStore(useShallow((state) => [state.loading, state.loggedIn]))

  const router = useRouter()

  useEffect(() => {
    if (!loading && loggedIn) {
      router.replace('/')
    }
  }, [loading, loggedIn])

  if (!loading && !loggedIn) {
    return (
      <FormPage heading="Register">
        <RegisterForm />
      </FormPage>
    )
  }
}

export default RegisterPage
