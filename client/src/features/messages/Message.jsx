import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectMessageById } from './messagesApiSlice'

const Message = ({ messageId }) => {
  const message = useSelector(state => selectMessageById(state, messageId))

  const navigate = useNavigate()

  if (message) {
    const created = new Date(message.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    })
    const updated = new Date(message.updatedAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    })
    const handleEdit = () => navigate(`/dash/messages/${messageId}`)
    //
    return (
      <div className=" flex flex-col gap-1 border-2 py-3 px-5">
        <div>
          <p className="text-2xl">{message.title}</p>
        </div>
        <div>
          <p className="text-sm">Content: {message.content}</p>
        </div>
        <div>
          {message.read === false ? (
            <span className="text-green-500 font-black">MESSAGE NOT READ</span>
          ) : (
            <span>MESSGAE READ</span>
          )}
        </div>
        <p className="text-sm">Created: {created}</p>
        <p className="text-sm">Updated: {updated}</p>
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

export default Message
