import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Player',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// messageSchema.plugin(AutoIncrement, {
//   inc_field: 'message',
//   id: 'messageNums',
//   start_seq: 100,
// })

const Message = mongoose.model('Message', messageSchema)

export default Message

// module.exports = mongoose.model('Message', messageSchema)
