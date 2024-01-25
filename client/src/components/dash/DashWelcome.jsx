import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import MessagesList from '../../features/messages/MessagesList'

const Welcome = () => {
  const { username, isPlayer, isCoach } = useAuth()
  //
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date)
  const content = (
    <>
      <div className="min-h-screen grid w-[100%] bg-center bg-cover bg-[url('../../../public/assets/lockerRoom.png')]">
        <div className="hero-overlay bg-black bg-opacity-70">
          <div className="flex flex-col min-h-[100%] pt-20 text-white">
            <div className="py-10 px-6 mx-10 bg-black bg-opacity-60 rounded-lg shadow-lg shadow-zinc-900">
              <h1 className="font-sans text-sm md:text-2xl lg:text-5xl font-black p-5 text-center">
                Welcome <span className="text-green-500">{username}</span>
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 text-left text-sm md:text-xl my-4">
                <div className="col-span-2 flex flex-col gap-6 text-left text-sm md:text-xl my-4">
                  <p className="text-md">
                    Today is: <span className="text-green-400">{today}</span>
                  </p>
                  <p className="text-md">You have 0: messages</p>
                </div>
                <div className="border-2 p-3">
                  Message List{/* <MessagesList /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
  return content
}

export default Welcome
