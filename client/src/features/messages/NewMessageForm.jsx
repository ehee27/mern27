// message form collects title, text, and assigns the message
// message created on backend will use "text" for first thread and then push additional "text" entries from the update form

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewMessageMutation } from './messagesApiSlice'
import useAuth from '../../hooks/useAuth'

const NewMessageForm = ({ users, setTransition }) => {
  const { username } = useAuth()
  const navigate = useNavigate()

  // STATE
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [userId, setUserId] = useState(users[0].id)

  // STATE HANDLERS
  const onTitleChanged = e => setTitle(e.target.value)
  const onTextChanged = e => setText(e.target.value)
  const onUserIdChanged = e => setUserId(e.target.value)

  // RTK Actions ---------------------------------------------
  const [addNewMessage, { isLoading, isSuccess, error }] =
    useAddNewMessageMutation()

  //
  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dash/messages')
    }
  }, [isSuccess, navigate])
  //
  const canSave = [title, text, userId].every(Boolean) && !isLoading

  // CREATE MESSAGE -------------------------------------------
  const onSaveMessageClicked = async e => {
    e.preventDefault()
    setTransition(true)
    if (canSave) {
      setTimeout(() => {
        setTransition(true)
        navigate('/dash/messages')
      }, 1000)
      await addNewMessage({
        creator: username,
        user: userId,
        title,
        content: text,
      })
    }
  }

  // User options -------------------------------------------
  const options = users.map(user => {
    return (
      <option key={user.id} value={user.id}>
        {' '}
        {user.username}
      </option>
    )
  })

  // CONTENT
  const content = (
    <>
      <form
        className="flex flex-col gap-2 bg-white rounded-lg w-[60%] p-8 text-gray-500"
        onSubmit={onSaveMessageClicked}
      >
        <div>
          <div></div>
        </div>
        <label className="text-sm" htmlFor="title">
          Title:
        </label>
        <input
          className="p-2 bg-white rounded-md border-2"
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="text-sm" htmlFor="text">
          Content:
        </label>
        <textarea
          className="p-1 bg-white rounded-md border-2"
          id="text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />

        <label className="text-sm" htmlFor="username">
          ASSIGNED TO:
        </label>
        <select
          className="p-2 bg-white rounded-md border-2"
          id="username"
          name="username"
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>
        <button
          className="btn bg-blue-500 text-white rounded.lg w-[20%] shadow-md shadow-gray-300 rounded-md p-1"
          title="Save"
          disabled={!canSave}
        >
          Save
        </button>
      </form>
    </>
  )
  return content
}

export default NewMessageForm
