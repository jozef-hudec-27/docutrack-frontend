import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'
import useUserStore from '../state/user-store'

// Redirect the user to the home page if they are already logged in
export default function withGuest(Component) {
  return function WithGuestComponent(props) {
    const [loading, loggedIn] = useUserStore(useShallow((state) => [state.loading, state.loggedIn]))
    const router = useRouter()

    useEffect(() => {
      if (!loading && loggedIn) {
        router.replace('/')
      }
    }, [loading, loggedIn])

    if (!loading && !loggedIn) {
      return <Component {...props} />
    }
  }
}
