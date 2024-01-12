import express from 'express'
import loginLimiter from '../middleware/loginLimiter.js'
import { login, refresh, logout } from '../controllers/authController.js'

const router = express.Router()

router.get('/')
router.post('/', loginLimiter, login)

router.get('/refresh', refresh)

router.post('/logout', logout)

export default router
