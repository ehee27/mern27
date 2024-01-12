import User from '../models/User.js'
import Message from '../models/Message.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean()
  if (!users?.length) {
    return res.status(400).json({ message: 'No users found' })
  }
  res.json(users)
})
//-------------------------------------------------------
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, email, roles } = req.body
  //-------------------------
  if (
    !username ||
    !password ||
    !email ||
    !Array.isArray(roles) ||
    !roles.length
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  //-------------------------
  const duplicate = await User.findOne({ username }).lean().exec()
  if (duplicate) {
    return res.status(409).json({ message: 'User account already exists' })
  }
  //-------------------------
  const hashedPassword = await bcrypt.hash(password, 10)
  //-------------------------
  const userObject = { username, password: hashedPassword, email, roles }
  //-------------------------
  const user = await User.create(userObject)
  if (user) {
    res.status(201).json({ message: `New Player ${username} created` })
  } else {
    res.status(400).json({ message: 'Invalid player data' })
  }
})
//-------------------------------------------------------
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body
  //-------------------------
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== 'boolean'
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  //-------------------------
  const user = await User.findById(id).exec()
  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }
  const duplicate = await User.findOne({ username }).lean().exec()
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate username' })
  }
  user.username = username
  user.roles = roles
  user.active = active
  if (password) {
    user.password = await bcrypt.hash(password, 10)
  }
  const updatedUser = await user.save()
  res.json({ message: `${updatedUser.username} updated` })
})
//-------------------------------------------------------
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body
  //-------------------------
  if (!id) {
    return res.status(400).json({ message: 'User ID required' })
  }
  //-------------------------
  const message = await Message.findOne({ user: id }).lean().exec()
  if (message) {
    return res.status(400).json({ message: 'User has assigned messages' })
  }
  //-------------------------
  const user = await User.findById(id).exec()
  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }
  //-------------------------
  const result = await User.deleteOne()
  const reply = `Username ${result.username} with ID ${result._id} deleted`
  res.json(reply)
})

export { getAllUsers, createNewUser, updateUser, deleteUser }
