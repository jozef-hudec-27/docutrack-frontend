'use client'

import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useRouter } from 'next/navigation'

import Navbar from './components/Navbar/Navbar'
import useUserStore from './state/user-store'

export default function Home() {
  const router = useRouter()

  const [loading, loggedIn] = useUserStore(useShallow((state) => [state.loading, state.loggedIn]))

  useEffect(() => {
    if (!loading && !loggedIn) {
      router.replace('/register')
    }
  }, [loading, loggedIn])

  if (loggedIn) {
    return (
      <>
        <Navbar />

        <div>Logged in</div>
      </>
    )
  }
}
