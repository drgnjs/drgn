import { createCipheriv, randomBytes } from 'crypto'

const encrypt = async (text: string) => {
  const iv = randomBytes(16)
  , cipher = createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  , encryptedText = Buffer.concat([cipher.update(text), cipher.final()])
 
  return `${iv.toString('hex')}:${encryptedText.toString('hex')}`
}

export default encrypt