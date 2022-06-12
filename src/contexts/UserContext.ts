import { createContext, Dispatch, SetStateAction } from 'react'
import { User } from '../types'

// @ts-ignore
const UserContext = createContext<{ user: User | null, setUser: Dispatch<SetStateAction<User | null>>, token: string | null, setToken: (token: string) => void }>(null)

export default UserContext
