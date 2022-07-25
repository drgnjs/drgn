import { createDecipheriv } from 'crypto'

const decrypt = async (text: any) => {
  const textArray = text.split(':')
  , iv = Buffer.from(textArray.shift(), 'hex')
  , encryptedText = Buffer.from(textArray.join(':'), 'hex')
  , decipher = createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  , decryptedText = Buffer.concat([decipher.update(encryptedText), decipher.final()])
 
  return decryptedText.toString()
}

export default decrypt