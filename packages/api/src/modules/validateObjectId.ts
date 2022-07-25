import mongoose from 'mongoose'

const validateObjectId = (id: any) => {
  if (!id || id === '' || !mongoose.Types.ObjectId.isValid(id))
    throw new Error('Invalid Id')

  const newObjectId = new mongoose.Types.ObjectId(id)

  if (newObjectId != id)
    throw new Error('Invalid Id')
}

export default validateObjectId
