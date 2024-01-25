import Message from '../models/Message.js'
import User from '../models/User.js'
import asyncHandler from 'express-async-handler'

const getAllMessages = asyncHandler(async (req, res) => {
  // Get all messages from MongoDB
  const messages = await Message.find().lean()

  if (!messages?.length) {
    return res.status(400).json({ message: 'No messages found' })
  }

  const messagesWithUser = await Promise.all(
    messages.map(async message => {
      const user = await User.findById(message.user).lean().exec()
      return { ...message, username: user.username }
    })
  )

  res.json(messagesWithUser)
})

const createNewMessage = asyncHandler(async (req, res) => {
  const { creator, user, title, content } = req.body
  console.log('THis is content', content)

  // Confirm data
  if (!user || !title || !content) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Check for duplicate title
  const duplicate = await Message.findOne({ title }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate message title' })
  }

  // Create and store the new user
  let newThread = []
  console.log('This is newThread', newThread)

  const message = await Message.create({
    creator,
    user,
    title,
    thread: [
      ...newThread,
      {
        timeStamp: new Date().toLocaleDateString('en-us', {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }),
        data: content,
      },
    ],
    // thread: thread.push(content),
    content,
  })

  if (message) {
    // Created
    return res.status(201).json({ message: 'New message created' })
  } else {
    return res.status(400).json({ message: 'Invalid message data received' })
  }
})

const updateMessage = asyncHandler(async (req, res) => {
  const { id, creator, user, title, content, read } = req.body

  // Confirm data
  if (!id || !user || !title || !content || typeof read !== 'boolean') {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Confirm message exists to update
  const message = await Message.findById(id).exec()

  if (!message) {
    return res.status(400).json({ message: 'Message not found' })
  }

  // Check for duplicate title
  const duplicate = await Message.findOne({ title }).lean().exec()

  // Allow renaming of the original message
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate message title' })
  }
  message.ceeator = creator
  message.user = user
  message.title = title
  message.thread = [
    ...message.thread,
    {
      timeStamp: new Date().toLocaleDateString('en-us', {
        // weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        // second: 'numeric',
      }),
      data: content,
    },
  ]
  message.content = content
  message.read = read

  const updatedMessage = await message.save()

  res.json(`'${updatedMessage.title}' updated`)
})

const deleteMessage = asyncHandler(async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'Message ID required' })
  }

  const message = await Message.findById(id).exec()

  if (!message) {
    return res.status(400).json({ message: 'Message not found' })
  }

  const result = await message.deleteOne()

  const reply = `Message '${result.title}' with ID ${result._id} deleted`

  res.json(reply)
})

export { getAllMessages, createNewMessage, updateMessage, deleteMessage }
