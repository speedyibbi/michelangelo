import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    unique: false
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

export default mongoose.model('Game', gameSchema)
