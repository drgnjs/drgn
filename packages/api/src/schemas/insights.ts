import mongoose from 'mongoose'
import type { Schema } from 'mongoose'

export type InsightsDocument = {
  _id: string
  os: string
  version: string
  user: string
  createdAt: string
  updatedAt: string
}

const schema: Schema = new mongoose.Schema({
  os: String,
  version: String,
  user: String
}, { timestamps: true })

const insightsSchema = mongoose.model<InsightsDocument>('insights', schema)

export default insightsSchema
