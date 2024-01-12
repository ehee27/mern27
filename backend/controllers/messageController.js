import Message from '../models/Message.js'
import Player from '../models/User.js'
import asyncHandler from 'express-async-handler'

const getAllMessages = asyncHandler(async (req, res) => {
  // Get all messages from MongoDB
  const messages = await Message.find().lean()

  if (!messages?.length) {
    return res.status(400).json({ message: 'No messages found' })
  }

  const messagesWithPlayer = await Promise.all(
    messages.map(async message => {
      const player = await Player.findById(message.player).lean().exec()
      return { ...message, username: player.username }
    })
  )

  res.json(messagesWithPlayer)
})

const createNewMessage = asyncHandler(async (req, res) => {
  const { player, title, content } = req.body

  // Confirm data
  if (!player || !title || !content) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Check for duplicate title
  const duplicate = await Message.findOne({ title }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate message title' })
  }

  // Create and store the new player
  const message = await Message.create({ player, title, content })

  if (message) {
    // Created
    return res.status(201).json({ message: 'New message created' })
  } else {
    return res.status(400).json({ message: 'Invalid message data received' })
  }
})

const updateMessage = asyncHandler(async (req, res) => {
  const { id, player, title, content, read } = req.body

  // Confirm data
  if (!id || !player || !title || !content || typeof read !== 'boolean') {
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

  message.player = player
  message.title = title
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
