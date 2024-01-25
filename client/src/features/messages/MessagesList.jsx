import { useGetMessagesQuery } from './messagesApiSlice'
import Message from './MessageCard'
import useAuth from '../../hooks/useAuth'
import Loading from '../../components/Loading'

const MessagesList = () => {
  const { username, isPlayer, isCoach } = useAuth()

  // RTK Actions ---------------------------------------------
  const {
    data: messages,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMessagesQuery('messagesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  // CONTENT
  let content

  // loading
  if (isLoading)
    content = (
      <>
        <Loading />
      </>
    )

  // error
  if (isError) {
    content = <p>{error?.data?.message}</p>
  }

  // success - CONVERT RTK DATA ---------------------
  if (isSuccess) {
    const { ids, entities } = messages
    //
    let filteredIds
    if (isPlayer || isCoach) {
      filteredIds = [...ids]
      // INITIALIZE IDs array
    } else {
      filteredIds = ids.filter(
        messageId => entities[messageId].username === username
      )
    }
    // CONSTRUCT MESSAGE objects from IDs --------------------
    const messagesContent =
      ids?.length &&
      filteredIds.map(messageId => (
        <Message key={messageId} messageId={messageId} />
      ))

    content = (
      // <div className="min-h-screen grid w-[100%] bg-center bg-cover bg-[url('../../../public/assets/lockerRoom.png')]">
      <div className="h-[100%] w-[100%]">
        {/* <div className="hero-overlay bg-black bg-opacity-70"> */}
        <div className="flex flex-col min-h-[100%] text-white">
          {/* <div className="py-10 px-6 mx-10 bg-black bg-opacity-60 rounded-lg shadow-lg shadow-zinc-900"> */}
          <h1 className="font-sans text-sm md:text-xl font-black p-2 text-center">
            Messages
          </h1>

          {/* --- GRID START ----- */}
          <div className="grid grid-cols-1">
            {/* ----------------- */}
            {/* <div className="flex flex-col gap-3 my-1 border-2 bg-gray-100 p-5 rounded-md"> */}
            <div className="flex flex-col gap-2">{messagesContent}</div>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
      </div>
    )
  }

  return content
}

export default MessagesList
