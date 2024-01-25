// after frontend is set with routes we can 'protect'
import express from 'express'
import {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js'
// import { protect } from '../middleware/authMiddleware.js'
import verifyJWT from '../middleware/verifyJWT.js'

// MULTER FOR FILE UPLOAD - see below
import multer from 'multer'

const router = express.Router()

// apply our verification
// router.use(verifyJWT)

router
  .route('/')
  .get(getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser)

// router.get('/', getAllUsers)

// router.post('/', createNewUser)
// router.patch('/', updateUser)
// router.delete('/', deleteUser)

//------ UPLOADING FILE ------------------
// At first we tried implementing this on the controller (might need to do that eventually) but for now we left all logic here

// 3 STEPS
// 1. initialize 'storage' object (destination folder and filename properties)
// 2. initialize 'upload' function from multer storage object
// 3. call upload.single with the 'file'... name should reflect ALL keys

// storage object
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/scottlucas/Desktop/mern27/client/public/assets')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  },
})

// upload function
const upload = multer({ storage })

// upload is called as middleware
// router.post('/profile/upload', upload.single('file'), (req, res) => {
router.post('/upload', upload.single('file'), (req, res) => {
  res.json(req.file)
})

export default router
