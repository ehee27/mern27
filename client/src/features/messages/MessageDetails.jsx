import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectMessageById } from './messagesApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditMessageForm from './EditMessageForm'
import Loading from '../../components/Loading'

const MessageDetails = () => {
  const { id } = useParams()
  const [transition, setTransition] = useState(false)

  const message = useSelector(state => selectMessageById(state, id))

  const users = useSelector(selectAllUsers)
  const content =
    message && users ? (
      // <EditMessageFormForm message={message} users={users} />
      <EditMessageForm
        message={message}
        users={users}
        id={id}
        setTransition={setTransition}
      />
    ) : (
      <p>Loading...</p>
    )
  return (
    <>
      {transition ? (
        <Loading />
      ) : (
        <div className="min-h-screen grid w-[100%] bg-center bg-cover bg-[url('../../../public/assets/lockerRoom.png')]">
          <div className="hero-overlay bg-black bg-opacity-70">
            <div className="flex flex-col min-h-[100%] pt-20 text-white">
              <div className="py-10 px-6 mx-10 bg-black bg-opacity-60 rounded-lg shadow-lg shadow-zinc-900">
                <h1 className="font-sans text-sm md:text-2xl lg:text-3xl font-black p-5 text-center">
                  {message.title}
                </h1>
                <p>Created at: {message.createdAt}</p>
                <div className="">
                  {message.thread.map((item, i) => {
                    return (
                      <div
                        className="border-2 border-white rounded-md p-3 my-2"
                        key={i}
                      >
                        <p className="text-green-300">{item.data}</p>
                        <p className="text-xs">Posted: {item.timeStamp}</p>
                      </div>
                    )
                  })}
                </div>
                <div className="flex flex-col justify-center items-center text-sm my-4">
                  {content}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MessageDetails
