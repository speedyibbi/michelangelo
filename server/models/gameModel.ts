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
  image: {
    url: {
      type: String,
      required: false,
      unique: false
    },
    type: {
      type: String,
      required: true,
      unique: false
    }
  },
  files: {
    data: {
      type: String,
      required: true,
      unique: false
    },
    framework: {
      type: String,
      required: true,
      unique: false
    },
    loader: {
      type: String,
      required: true,
      unique: false
    },
    wasm: {
      type: String,
      required: true,
      unique: false
    }
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

export default mongoose.model('Game', gameSchema)
