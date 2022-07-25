export type User = {
  _id: string
  email: string
  password?: string
  secret?: string // for 2fa
  passwordless?: boolean
  twoFactor?: boolean
  signupNumber: number
  createdAt: string
  updatedAt: string
}

export type Server = {
  _id: string
  user: string
  credentials: {
    host: string
    port: number
    username: string
    password?: string
    privateKey?: string
  }
  createdAt: string
  updatedAt: string
}
