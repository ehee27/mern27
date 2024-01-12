import { useGetMessagesQuery } from './messagesApiSlice'
import Message from './Message'

const MessagesList = () => {
  //
  const {
    data: messages,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMessagesQuery(null, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })
  //
  let content
  if (isLoading) content = <p>Loading...</p>
  if (isError) {
    content = <p>{error?.data?.message}</p>
  }
  if (isSuccess) {
    const { ids } = messages
    const pageContent = ids?.length
      ? ids.map(messageId => <Message key={messageId} messageId={messageId} />)
      : null

    content = (
      <div className="p-3">
        <h1 className="text-xl md:text-2xl lg:text-3xl p-5">Message List</h1>
        {/* --- GRID START ----- */}
        <div className="grid grid-cols-1">
          {/* ----------------- */}
          <div className="flex flex-col gap-3 my-1 border-2 bg-gray-100 p-5 rounded-md">
            <div>{pageContent}</div>
          </div>
        </div>
      </div>
    )
  }

  return content
}

export default MessagesList
