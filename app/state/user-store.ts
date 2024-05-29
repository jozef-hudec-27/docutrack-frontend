import { create } from 'zustand'

import api from '../api/axios-instance'

import type { User } from '../types/global-types'
import type { SetUserFn, FetchUserFn } from '../types/user-types'

type UserStore = {
  user: User
  setUser: SetUserFn
  loggedIn: boolean
  loading: boolean
  fetchUser: FetchUserFn
}

export default create<UserStore>()((set) => ({
  user: {} as User,
  setUser: (user) => set({ user, loggedIn: !!Object.keys(user).length }),
  loggedIn: false,
  loading: true,
  fetchUser: async () => {
    if (!localStorage.getItem('authToken')) {
      set({ loading: false })
      throw new Error()
    }

    set({ loading: true })

    try {
      const response = await api(true).get('/user')

      set({ user: response.data, loading: false, loggedIn: !!Object.keys(response.data).length })

      return response.data as User
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },
}))
