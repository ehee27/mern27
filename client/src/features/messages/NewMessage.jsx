import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewMessageForm from './NewMessageForm'

const NewMessage = () => {
  const users = useSelector(selectAllUsers)

  const content = users ? <NewMessageForm users={users} /> : <p>Loading...</p>
  return (
    <div className="p-3">
      <h1 className="text-xl md:text-2xl lg:text-3xl p-5">New Message</h1>
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

export default NewMessage
