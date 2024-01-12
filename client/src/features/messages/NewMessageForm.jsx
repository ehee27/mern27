import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewMessageMutation } from './messagesApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const NewMessageForm = ({ users }) => {
  const [addNewMessage, { isLoading, isSuccess, error }] =
    useAddNewMessageMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [userId, setUserId] = useState(users[0].id)

  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dash/messages')
    }
  }, [isSuccess, navigate])

  const onTitleChanged = e => setTitle(e.target.value)
  const onTextChanged = e => setText(e.target.value)
  const onUserIdChanged = e => setUserId(e.target.value)

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveMessageClicked = async e => {
    e.preventDefault()
    if (canSave) {
      await addNewMessage({ user: userId, title, content: text })
    }
  }

  const options = users.map(user => {
    return (
      <option key={user.id} value={user.id}>
        {' '}
        {user.username}
      </option>
    )
  })

  // const errClass = isError ? "errmsg" : "offscreen"
  // const validTitleClass = !title ? "form__input--incomplete" : ''
  // const validTextClass = !text ? "form__input--incomplete" : ''

  const content = (
    <>
      <p>{error?.data?.message}</p>

      <form
        className="flex flex-col gap-2 shadow-md shadow-gray-400 p-3 w-[50%]"
        onSubmit={onSaveMessageClicked}
      >
        <div>
          <h2>New Message</h2>
          <div>
            <button
              className="btn bg-blue-500 text-white rounded.lg w-[20%] shadow-md shadow-gray-300 rounded-md p-1"
              title="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="text-sm" htmlFor="title">
          Title:
        </label>
        <input
          className="p-1 bg-white rounded-md"
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
          className="p-1 bg-white rounded-md"
          id="text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />

        <label className="text-sm" htmlFor="username">
          ASSIGNED TO:
        </label>
        <select
          id="username"
          name="username"
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>
      </form>
    </>
  )

  return content
}

export default NewMessageForm
