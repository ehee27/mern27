import { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { ROLES } from '../../config/roles'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {
  const navigate = useNavigate()
  //-----------------------------------------------------
  const [updateUser, { isLoading, isSuccess, error }] = useUpdateUserMutation()
  //-----------------------------------------------------
  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation()
  //-----------------------------------------------------

  const [username, setUsername] = useState(user.username)
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(user.roles)
  const [active, setActive] = useState(user.active)
  //-----------------------------------------------------
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    console.log(isSuccess)
    if (isSuccess || isDelSuccess) {
      setUsername('')
      setPassword('')
      setRoles([])
      navigate('/dash/users')
    }
  }, [isSuccess, isDelSuccess, navigate])
  //-----------------------------------------------------
  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)
  const onRolesChanged = e => {
    const values = Array.from(e.target.selectedOptions, option => option.value)
    setRoles(values)
  }
  const onActiveChanged = () => setActive(prev => !prev)
  //-----------------------------------------------------
  const onSaveUserClicked = async e => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active })
    } else {
      await updateUser({ id: user.id, username, roles, active })
    }
  }

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id })
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
  let canSave
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading
  }

  // const errContent = (error?.data?.message || delerror?.data?.message) ?? ''
  const content = (
    <>
      <form
        className="flex flex-col gap-2 shadow-md shadow-gray-400 p-3 w-[50%]"
        onSubmit={e => e.preventDefault()}
      >
        <div>
          <h2>Edit User</h2>
          <div>
            <button
              className="btn bg-blue-500 text-white rounded.lg w-[20%] shadow-md shadow-gray-300 rounded-md p-1"
              title="Save"
              onClick={onSaveUserClicked}
              // disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="btn bg-blue-500 text-white rounded.lg w-[20%] shadow-md shadow-gray-300 rounded-md p-1"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
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
          Password: <span>[empty = no change]</span>{' '}
          <span>[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className="p-1 bg-white rounded-md"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />

        <label className="text-sm" htmlFor="user-active">
          ACTIVE:
          <input
            className="p-1 bg-white rounded-md"
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={onActiveChanged}
          />
        </label>

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
      </form>
    </>
  )
  return <>{content}</>
}
export default EditUserForm
