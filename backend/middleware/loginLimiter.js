import rateLimit from 'express-rate-limit'

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message:
      'Too many login attempts from this IP, please wait 60 seconds and try again',
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).send(options.message)
  },
  standardHeaders: true,
  legacyHeaders: false,
})

export default loginLimiter
