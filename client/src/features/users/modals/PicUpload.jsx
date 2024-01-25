// modal contains a form to upload image file
// 3 STEPS
// 1. formData uploaded via routes w multer - image uploaded to assets
// 2. updateProfile runs to update 'player.profilePic'
// 3. dispatch 'setCreds' to update auth/playerInfo with profilePic data

import { useState, useEffect } from 'react'
// import { useUpdateMutation, useUploadPicMutation } from './playersApiSlice'
import { useUploadPicMutation, useUpdateUserMutation } from '../usersApiSlice'
import { useNavigate } from 'react-router-dom'
// import { setCredentials } from '../auth/authSlice'
// import { useDispatch } from 'react-redux'
// import Loading from '../../components/utils/Loading'
// import { toast } from 'react-toastify'

const PicUpload = ({ user, openPicUpload, onClose, setTransition }) => {
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const [uploadPic, { isLoading }] = useUploadPicMutation()
  const [updateUser, { isLoading2, isSuccess }] = useUpdateUserMutation()
  const [file, setFile] = useState('')

  useEffect(() => {
    if (isSuccess) {
      setTransition(true)
      setTimeout(() => {
        setTransition(false)
        navigate('/dash/users')
      }, 1000)
    }
  }, [isSuccess, navigate])

  // handleUpload runs steps 1-3 mentioned above
  const handleUpload = async e => {
    e.preventDefault()
    try {
      // package the form data
      const formData = new FormData()
      formData.append('file', file)

      uploadPic(formData)
      await updateUser({
        id: user.id,
        username: user.username,
        roles: user.roles,
        active: user.active,
        position: user.position,
        number: user.number,
        age: user.age,
        height: user.height,
        weight: user.weight,
        bats: user.bats,
        throws: user.throws,
        hs: user.hs,
        bio: user.bio,
        profilePic: file.name,
      })
      // const res = await updateUser({
      //   id: user.id,
      //   profilePic: file.name,
      // }).unwrap()

      // dispatch(setCredentials({ ...res, password: playerInfo.password }))
      // window.location.reload()
    } catch (error) {
      // toast.error(error)
      console.log(error)
    }
  }

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ? ${
        openPicUpload ? 'visible bg-black/20' : 'invisible'
      }`}
    >
      {/* ACTUAL MODAL CONTENT ------------------------------------- */}

      <div
        onClick={e => e.stopPropagation()}
        className={`bg-white/90 rounded-xl shadow p-6 w-2/3 transition-all ${
          openPicUpload ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 p-1 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-600"
        >
          X
        </button>
        <input
          className="text-sm"
          type="file"
          accept="image/"
          onChange={e => setFile(e.target.files[0])}
        />
        <button
          className="btn btn-accent transition ease-in-out delay-50 w-[100px] h-[27px] hover:scale-105 text-xs text-white p-1 rounded hover:bg-green-500"
          onClick={handleUpload}
        >
          UPLOAD
        </button>
      </div>
    </div>
  )
}

export default PicUpload
