import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectMessageById } from './messagesApiSlice.js'
import useAuth from '../../hooks/useAuth.js'
import Loading from '../../components/Loading.jsx'

const MessageCard = ({ messageId }) => {
  const navigate = useNavigate()
  const { username } = useAuth()
  const [transition, setTransition] = useState(false)

  // RTK custom selector for Message ----------------------------
  const message = useSelector(state => selectMessageById(state, messageId))

  // check creator and asigned to ---------------------------------
  if (message.username === username || message.creator === username) {
    const created = new Date(message.createdAt).toLocaleDateString('en-us', {
      // weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      // second: 'numeric',
    })
    //
    const handleEdit = () => navigate(`/dash/messages/${messageId}`)

    //-----------------------------------------------------
    return (
      <>
        {transition ? (
          <Loading />
        ) : (
          <div className="bg-white flex flex-col border-2 py-3 px-3 rounded-lg shadow-md shadow-gray-200 w-[100%] hover:shadow-inner hover:shadow-gray-300 hover:cursor-pointer transition-all text-gray-700">
            <div className="border-2 rounded-t-lg p-1 flex justify-center items-center">
              <p className="text-sm md:text-xl">{message.title}</p>
            </div>
            <div className="flex justify-center bg-gray-100 p-2">
              <p className="text-sm">Content: {message.content}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 bg-zinc-800 rounded-b-lg p-2">
              <div className="text-xs text-white font-bold">
                <p>{created}</p>
              </div>
              <div className="flex md:justify-around md:items-center">
                {message.read === false ? (
                  <span className="text-xs font-semibold md:font-black text-green-500 border-2 border-green-400 py-1 px-5 rounded-sm hover:text-white transition-all">
                    READ
                  </span>
                ) : (
                  <span>MESSGAE READ</span>
                )}
                <button
                  onClick={handleEdit}
                  className="btn btn-sm w-[50px] bg-gray-400 text-white rounded-lg p-1 text-sm"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </div>
            </div>

            <div>
              {/* <button
                onClick={handleEdit}
                className="btn btn-sm w-[50px] bg-gray-400 text-white rounded-lg shadow-md shadow-gray-300 p-1 text-sm mt-2"
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button> */}
            </div>
          </div>
        )}
      </>
    )
  } else return null
}

export default MessageCard
