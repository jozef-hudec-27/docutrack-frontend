import type { User } from './global-types'

export type SetUserFn = (user: User) => void

export type FetchUserFn = () => Promise<User>
