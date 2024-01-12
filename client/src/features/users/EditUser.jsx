import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import EditUserForm from './EditUserForm'

const EditUser = () => {
  const { id } = useParams()

  const user = useSelector(state => selectUserById(state, id))

  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>

  return (
    <div className="p-3">
      <h1 className="text-xl md:text-2xl lg:text-3xl p-5">EDIT USER</h1>
      {/* --- GRID START ----- */}
      <div className="grid grid-cols-1">
        {/* ----------------- */}
        <div className="flex flex-col gap-3 my-1 border-2 bg-gray-100 p-5 rounded-md">
          <h2 className="text-xl md:text-2xl lg:text-3xl">HEADING</h2>
          {content}
        </div>
      </div>
      {/* ----------------- */}
    </div>
  )
}

export default EditUser
