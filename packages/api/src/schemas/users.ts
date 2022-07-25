import mongoose from 'mongoose'
import type { Schema } from 'mongoose'

export type UserDocument = {
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

const schema: Schema = new mongoose.Schema({
  email: String,
  password: String,
  secret: String,
  passwordless: Boolean,
  twoFactor: Boolean,
  signupNumber: Number
}, { timestamps: true })

const userSchema = mongoose.model<UserDocument>('users', schema)

export default userSchema
