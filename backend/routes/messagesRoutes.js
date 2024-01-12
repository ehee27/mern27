import express from 'express'
import {
  getAllMessages,
  createNewMessage,
  updateMessage,
  deleteMessage,
} from '../controllers/messageController.js'
import verifyJWT from '../middleware/verifyJWT.js'

const router = express.Router()

router.use(verifyJWT)

router.get('/', getAllMessages)
router.post('/', createNewMessage)
router.patch('/', updateMessage)
router.delete('/', deleteMessage)

export default router
