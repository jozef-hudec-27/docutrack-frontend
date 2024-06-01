import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useRouter } from 'next/navigation'

import useUserStore from '../state/user-store'

// Redirect the user to the registration page if they are not logged in
export default function withAuth(Component) {
  return function WithAuthComponent(props) {
    const [loading, loggedIn] = useUserStore(useShallow((state) => [state.loading, state.loggedIn]))
    const router = useRouter()

    useEffect(() => {
      if (!loading && !loggedIn) {
        router.replace('/register')
      }
    }, [loading, loggedIn])

    if (!loading && loggedIn) {
      return <Component {...props} />
    }
  }
}
