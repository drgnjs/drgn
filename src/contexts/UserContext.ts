import { createContext } from 'react'
import type { User } from '../types'
import type { Dispatch, SetStateAction } from 'react'

// @ts-ignore
const UserContext = createContext<{ user: User | null, setUser: Dispatch<SetStateAction<User | null>>, token: string | null, setToken: (token: string | null) => void }>(null)

export default UserContext
