import express from 'express'
import loginLimiter from '../middleware/loginLimiter.js'
import { login, refresh, logout } from '../controllers/authController.js'

const router = express.Router()

router.route('/').post(loginLimiter, login)

router.route('/refresh').get(refresh)

router.route('/logout').post(logout)

// router.get('/')
// router.post('/', loginLimiter, login)

// router.get('/refresh', refresh)

// router.post('/logout', logout)

export default router
