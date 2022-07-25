import mongoose from 'mongoose'

const isValidObjectId = (id: any) => {
  if (!id || id === '' || !mongoose.Types.ObjectId.isValid(id))
    return false

  const newObjectId = new mongoose.Types.ObjectId(id)

  if (newObjectId != id)
    return false

  return true
}

export default isValidObjectId
