export {}

declare global {
  const ENCRYPTION_KEY: string
  const JWT_SECRET: string
  const MONGO: string
  const PORT: number
  const DEV: boolean
  const RATE_LIMIT: number
  const EMAIL_USER: string
  const EMAIL_PASSWORD: string
}
