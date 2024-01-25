import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import profilePic from '../../../public/assets/profilePic.png'

const UserCard = ({ userId }) => {
  const user = useSelector(state => selectUserById(state, userId))
  // console.log('This', user)

  const navigate = useNavigate()

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`)

    const userRolesString = user.roles.toString().replaceAll(',', ', ')

    // const userStatus = user.active ? '' : 'visibility: hidden'
    return (
      <>
        <Link to={`/dash/users/${userId}`}>
          <div className="bg-white flex flex-col border-2 py-3 px-3 rounded-lg shadow-md shadow-zinc-900 hover:shadow-inner hover:shadow-black hover:cursor-pointer transition-all">
            {/* ///////// */}
            <div className="border-2 rounded-t-lg p-1 flex justify-center items-center">
              <div className="w-[60%] text-gray-500">
                <p className="text-xl md:text-xl">
                  {user.name}{' '}
                  <span className="text-sm text-orange-700">
                    | {user.position}
                  </span>
                </p>
              </div>
              <div className="flex justify-center w-[40%]">
                <p className="text-green-500 font-black">
                  {user.active === true ? (
                    <span>ACTIVE</span>
                  ) : (
                    <span>Inactive</span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex justify-center bg-gray-200 rounded-b-lg p-2">
              <div className="flex flex-col gap-2 w-[60%] text-gray-600">
                <p className="text-sm">Role: {userRolesString}</p>
                <p className="text-sm">Age: {user.age}</p>
                <p className="text-sm">Bats: {user.bats}</p>
                <p className="text-sm">Throws: {user.throws}</p>
                <button
                  onClick={handleEdit}
                  className="btn btn-sm w-[50px] bg-gray-400 text-white rounded-lg shadow-md shadow-gray-300 p-1 text-sm"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </div>
              <div className="flex justify-center w-[40%]">
                <img
                  src={
                    user.profilePic === ''
                      ? profilePic
                      : `../../../public/assets/${user.profilePic}`
                  }
                  className="w-[100%] rounded-md"
                ></img>
              </div>
            </div>
          </div>
        </Link>
      </>
    )
  } else return null
}

export default UserCard
