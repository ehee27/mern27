// USE TOAST FOR ERRORS
import { useState, useEffect } from 'react'
import { useAddNewUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { ROLES } from '../../config/roles'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, error }] = useAddNewUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [roles, setRoles] = useState(['User'])
  //-----------------------------------------------------
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (isSuccess) {
      setUsername('')
      setPassword('')
      setEmail('')
      setRoles([])
      navigate('/dash/users')
    }
  }, [isSuccess, navigate])
  //-----------------------------------------------------
  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)
  const onEmailChanged = e => setEmail(e.target.value)

  const onRolesChanged = e => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      option => option.value
    )
    setRoles(values)
  }
  //-----------------------------------------------------
  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
  //-----------------------------------------------------
  const onSaveUserClicked = async e => {
    e.preventDefault()
    if (canSave) {
      await addNewUser({ username, password, email, roles })
    }
  }
  //-----------------------------------------------------
  const options = Object.values(ROLES).map(role => {
    return (
      <option key={role} value={role}>
        {' '}
        {role}
      </option>
    )
  })
  //-----------------------------------------------------
  const content = (
    <>
      <p>{error?.data?.message}</p>

      <form
        className="flex flex-col gap-2 shadow-md shadow-gray-400 p-3 w-[50%]"
        onSubmit={onSaveUserClicked}
      >
        <div>
          <h2>New User</h2>
        </div>
        <label className="text-sm" htmlFor="username">
          Username: <span>[3-20 letters]</span>
        </label>
        <input
          className="p-1 bg-white rounded-md"
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        <label className="text-sm" htmlFor="password">
          Password: <span>[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className="p-1 bg-white rounded-md"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />
        <label className="text-sm" htmlFor="email">
          Email: <span>[3-20 letters]</span>
        </label>
        <input
          className="p-1 bg-white rounded-md"
          id="email"
          name="email"
          type="text"
          autoComplete="off"
          value={email}
          onChange={onEmailChanged}
        />

        <label className="text-sm" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <select
          className="p-1 bg-white rounded-md"
          id="roles"
          name="roles"
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
        <div>
          <button
            className="btn bg-blue-500 text-white rounded.lg w-[20%] shadow-md shadow-gray-300 rounded-md p-1"
            title="Save"
            disabled={!canSave}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        </div>
      </form>
    </>
  )

  return (
    <div className="p-3">
      <h1 className="text-xl md:text-2xl lg:text-3xl p-5">NEW USER FORM</h1>
      {/* --- GRID START ----- */}
      <div className="grid grid-cols-1">
        {/* ----------------- */}
        <div className="flex flex-col gap-3 my-1 border-2 bg-gray-100 p-5 rounded-md">
          <h2 className="text-xl md:text-2xl lg:text-3xl">HEADING</h2>
          {content}
        </div>
      </div>
      {/* ----------------- */}
    </div>
  )
}

export default NewUserForm
