import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: false
  },
  username: {
    type: String,
    default: '',
    required: false,
    unique: false
  }
})

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
})

export default mongoose.model('User', userSchema)
