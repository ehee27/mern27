import express from 'express'
import {
  getAllMessages,
  createNewMessage,
  updateMessage,
  deleteMessage,
} from '../controllers/messageController.js'
import verifyJWT from '../middleware/verifyJWT.js'

const router = express.Router()

// apply our verification
// router.use(verifyJWT)

router
  .route('/')
  .get(getAllMessages)
  .post(createNewMessage)
  .patch(updateMessage)
  .delete(deleteMessage)

// router.get('/', getAllMessages)
// router.post('/', createNewMessage)
// router.patch('/', updateMessage)
// router.delete('/', deleteMessage)

export default router
