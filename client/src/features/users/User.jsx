import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

const User = ({ userId }) => {
  const user = useSelector(state => selectUserById(state, userId))

  const navigate = useNavigate()

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`)

    const userRolesString = user.roles.toString().replaceAll(',', ', ')

    // const userStatus = user.active ? '' : 'visibility: hidden'
    return (
      <div className=" flex flex-col gap-1 border-2 py-3 px-5">
        <div>
          <p className="text-2xl">{user.username}</p>
        </div>
        <div>
          <p className="text-sm">Role: {userRolesString}</p>
        </div>
        <div>
          {user.active === true ? (
            <span className="text-green-500 font-black">ACTIVE</span>
          ) : (
            <span>Inactive</span>
          )}
        </div>
        <div>
          <button
            onClick={handleEdit}
            className="btn bg-blue-500 text-white rounded.lg w-[17%] max-w-[40px] shadow-md shadow-gray-300 rounded-md p-1"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
      </div>
    )
  } else return null
}

export default User
