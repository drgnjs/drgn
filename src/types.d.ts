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
