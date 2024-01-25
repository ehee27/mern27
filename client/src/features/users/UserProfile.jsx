import { useEffect } from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import profilePic from '../../../public/assets/profilePic.png'
import Loading from '../../components/Loading'
import EditData from './modals/EditData'
import PicUpload from './modals/PicUpload'
//
import useAuth from '../../hooks/useAuth'

const UserProfile = () => {
  // AUTH & PARAMS ID -----------------------
  const { username, stats } = useAuth()
  const paramsID = useParams().id
  console.log('This is stats', stats)

  // SELECT USER BY ID
  const user = useSelector(state => selectUserById(state, paramsID))

  // STATE
  const [openEditData, setOpenEditData] = useState(false)
  const [openPicUpload, setOpenPicUpload] = useState(false)
  const [transition, setTransition] = useState(false)
  // USER DATA OBJECT
  const userData = [
    { label: 'Age', value: user.age },
    { label: 'Height', value: user.height },
    { label: 'Weight', value: user.weight },
    { label: 'Bats', value: user.bats },
    { label: 'Throws', value: user.throws },
    { label: 'HS', value: user.hs },
  ]

  // CHECK empty bio to trigger modal ---------------
  useEffect(() => {
    if (username === user.username && user.bio === '') {
      setOpenEditData(true)
    }
  }, [])

  return (
    <>
      {transition ? (
        <Loading />
      ) : (
        <div className="min-h-screen flex flex-col w-[100%] bg-center bg-cover bg-gradient-to-br from-gray-700 via-gray-900 to-black">
          <EditData
            openEditData={openEditData}
            onClose={() => setOpenEditData(false)}
            setTransition={setTransition}
          />
          <PicUpload
            user={user}
            openPicUpload={openPicUpload}
            onClose={() => setOpenPicUpload(false)}
            setTransition={setTransition}
          />

          <div className="hero-overlay bg-black bg-opacity-70">
            <div className="flex flex-col min-h-[100%] pt-20 text-white">
              <div className="py-10 px-6 mx-10 bg-black bg-opacity-60 rounded-lg shadow-lg shadow-zinc-900">
                <div className="flex flex-col gap-4 text-left text-sm md:text-xl my-4">
                  <div className="bg-white rounded-t-lg p-1 flex justify-around text-black">
                    <p className="text-md md:text-xl">
                      {user.name}{' '}
                      <span className="text-orange-700">| {user.position}</span>
                    </p>
                    <p className="text-green-500 font-black">
                      {user.active === true ? (
                        <span>ACTIVE</span>
                      ) : (
                        <span>Inactive</span>
                      )}
                    </p>
                  </div>
                  {/* ---------------------------------------------------------------- */}
                  <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-200 rounded-b-lg p-2">
                    <div className="flex justify-center">
                      <img
                        src={
                          user.profilePic === ''
                            ? profilePic
                            : `../../../public/assets/${user.profilePic}`
                        }
                        className="w-[100%] max-w-[250px] rounded-md"
                      ></img>
                    </div>
                    <div className="flex flex-col gap-2 text-black">
                      {userData.map((item, i) => (
                        <p key={i}>
                          {item.label}: {item.value}
                        </p>
                      ))}
                      <div className="border-t-2 border-black py-4 mr-8">
                        <p>Bio: {user.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {username === user.username ? (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setOpenPicUpload(!openPicUpload)}
                      className="btn btn-accent btn-sm w-[200px] bg-gray-400 text-white rounded-lg p-1 text-sm"
                    >
                      Update Profile Pic
                    </button>
                    <button
                      onClick={() => setOpenEditData(!openEditData)}
                      className="btn btn-accent btn-sm w-[50px] bg-gray-400 text-white rounded-lg p-1 text-sm"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </div>
                ) : (
                  <span></span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserProfile
