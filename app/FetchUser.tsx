'use client'

import { useEffect } from 'react'

import useUserStore from './state/user-store'

function FetchUser() {
  const fetchUser = useUserStore((state) => state.fetchUser)

  useEffect(() => {
    fetchUser().catch(() => {})
  }, [])

  return <></>
}

export default FetchUser
