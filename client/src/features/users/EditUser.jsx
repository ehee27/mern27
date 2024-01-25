import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import EditUserForm from './EditUserForm'

const EditUser = ({ setTransition }) => {
  const { id } = useParams()

  const user = useSelector(state => selectUserById(state, id))

  const content = user ? (
    <EditUserForm setTransition={setTransition} user={user} />
  ) : (
    <p>Loading...</p>
  )

  return (
    <>
      {/* <div className="p-3"> */}

      <div className="grid grid-cols-1">
        {/* <div className="flex flex-col gap-3 my-1 border-2 bg-gray-100 p-5 rounded-md"> */}
        {content}
        {/* </div> */}
      </div>

      {/* </div> */}
    </>
  )
}

export default EditUser
