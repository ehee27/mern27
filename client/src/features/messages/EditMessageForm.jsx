import { useState, useEffect } from 'react'
import {
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} from './messagesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const EditMessageForm = ({ message, users }) => {
  const navigate = useNavigate()
  //-----------------------------------------------------
  const [updateMessage, { isLoading, isSuccess, error }] =
    useUpdateMessageMutation()
  //-----------------------------------------------------
  const [
    deleteMessage,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteMessageMutation()

  //-----------------------------------------------------
  const [title, setTitle] = useState(message.title)
  const [text, setText] = useState(message.text)
  const [read, setRead] = useState(message.read)
  const [userId, setUserId] = useState(message.user)
  //-----------------------------------------------------
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dash/messages')
    }
  }, [isSuccess, isDelSuccess, navigate])

  //-----------------------------------------------------
  const onTitleChanged = e => setTitle(e.target.value)
  const onTextChanged = e => setText(e.target.value)
  const onReadChanged = () => setRead(prev => !prev)
  const onUserIdChanged = e => setUserId(e.target.value)

  //-----------------------------------------------------
  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveMessageClicked = async e => {
    if (canSave) {
      await updateMessage({
        id: message.id,
        user: userId,
        title,
        content: text,
        read,
      })
    }
  }

  const onDeleteMessageClicked = async () => {
    await deleteMessage({ id: message.id })
  }
  //-----------------------------------------------------
  const created = new Date(message.createdAt).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })
  const updated = new Date(message.updatedAt).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })
  //-----------------------------------------------------
  const options = users.map(user => {
    return (
      <option key={user.id} value={user.id}>
        {' '}
        {user.username}
      </option>
    )
  })
  const content = (
    <>
      <form
        className="flex flex-col gap-2 shadow-md shadow-gray-400 p-3 w-[50%]"
        onSubmit={e => e.preventDefault()}
      >
        <div>
          <h2>Edit Message</h2>
          <div>
            <button
              className="btn bg-blue-500 text-white rounded.lg w-[20%] shadow-md shadow-gray-300 rounded-md p-1"
              title="Save"
              onClick={onSaveMessageClicked}
              // disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="btn bg-blue-500 text-white rounded.lg w-[20%] shadow-md shadow-gray-300 rounded-md p-1"
              title="Delete"
              onClick={onDeleteMessageClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="text-sm" htmlFor="username">
          Title:
        </label>
        <input
          className="p-1 bg-white rounded-md"
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="text-sm" htmlFor="password">
          Content:
        </label>
        <textarea
          className="p-1 bg-white rounded-md"
          id="text"
          name="text"
          type="text"
          value={text}
          onChange={onTextChanged}
        />

        <label className="text-sm" htmlFor="message-read">
          Read:
          <input
            className="p-1 bg-white rounded-md"
            id="message-read"
            name="message-read"
            type="checkbox"
            checked={read}
            onChange={onReadChanged}
          />
        </label>

        <label className="text-sm" htmlFor="roles">
          ASSIGNED USER:
        </label>
        <select
          className="p-1 bg-white rounded-md"
          id="user"
          name="user"
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>
      </form>
    </>
  )
  return <>{content}</>
}

export default EditMessageForm
