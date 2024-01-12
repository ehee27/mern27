import mongoose from 'mongoose'
// const Autoincrement = require('mongoose-sequence')(mongoose)
// import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: String,
        default: 'User',
      },
    ],
    active: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)
// userSchema.plugin(Autoincrement, {
//   inc_field: 'profile_id',
//   id: 'profile_id',
//   start_seq: 100,
// })

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     next()
//   }
//   const salt = await bcrypt.genSalt(10)
//   this.password = await bcrypt.hash(this.password, salt)
// })

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password)
// }

const User = mongoose.model('User', userSchema)

export default User
