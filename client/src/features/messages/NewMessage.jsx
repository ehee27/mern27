import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewMessageForm from './NewMessageForm'
import Loading from '../../components/Loading'

const NewMessage = () => {
  const [transition, setTransition] = useState(false)
  const users = useSelector(selectAllUsers)

  if (!users?.length) return <p>Not Currently Available</p>

  // const content = users ? <NewMessageForm users={users} /> : <p>Loading...</p>
  if (transition)
    return (
      <>
        <Loading />
      </>
    )
  const content = <NewMessageForm users={users} setTransition={setTransition} />
  //
  return (
    <div className="min-h-screen grid w-[100%] bg-center bg-cover bg-[url('../../../public/assets/Baum-Walker-Stadium-1.png')]">
      <div className="hero-overlay bg-black bg-opacity-70">
        <div className="flex flex-col min-h-[100%] pt-20 text-white">
          <div className="py-10 px-6 mx-10 bg-black bg-opacity-60 rounded-lg shadow-lg shadow-zinc-900">
            <h1 className="font-sans text-sm md:text-2xl lg:text-5xl font-black p-5 text-center">
              Create new message
            </h1>
            <div className="flex flex-col justify-center items-center text-sm my-4">
              {content}
            </div>
          </div>
        </div>
      </div>
      {/* ----------------- */}
    </div>
  )
}

export default NewMessage
