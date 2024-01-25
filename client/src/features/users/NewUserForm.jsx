// USE TOAST FOR ERRORS
import { useState, useEffect } from 'react'
import { useAddNewUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { ROLES } from '../../config/roles'
//
import { useLoginMutation } from '../auth/authApiSlice'
import { setCredentials } from '../auth/authSlice'
import { useDispatch } from 'react-redux'
import Loading from '../../components/Loading'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, error }] = useAddNewUserMutation()
  const [login] = useLoginMutation()
  //
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [roles, setRoles] = useState(['User'])
  const [transition, setTransition] = useState(false)

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
      // navigate('/dash')
    }
  }, [isSuccess, navigate])

  //-----------------------------------------------------
  const onNameChanged = e => setName(e.target.value)
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
    setTransition(true)
    setTimeout(() => {
      setTransition(false)
      navigate('/dash')
    }, 1000)
    if (canSave) {
      await addNewUser({ name, username, password, email, roles })
      try {
        const { accessToken } = await login({ username, password }).unwrap()
        dispatch(setCredentials({ accessToken }))
      } catch (err) {
        console.log(err)
      }
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
  if (transition)
    return (
      <>
        <Loading />
      </>
    )
  const content = (
    <div className="min-h-screen grid w-[100%] bg-center bg-cover bg-[url('../../../public/assets/Baum-Walker-Stadium-1.png')]">
      {/* <p>{error?.data?.message}</p> */}
      <div className="hero-overlay bg-black bg-opacity-70">
        <div className="flex flex-col min-h-[100%] pt-20 text-white">
          <div className="py-10 px-6 mx-10 bg-black bg-opacity-60 rounded-lg shadow-lg shadow-zinc-900">
            <h1 className="font-sans text-sm md:text-2xl lg:text-5xl font-black p-5 text-center">
              Create new account
            </h1>
            <div className="flex flex-col justify-center items-center text-sm my-4">
              <form
                className="flex flex-col gap-2 bg-white rounded-lg w-[60%] p-8 text-gray-500"
                onSubmit={onSaveUserClicked}
              >
                <div></div>
                <label className="text-sm" htmlFor="name">
                  Name: <span>[3-20 letters]</span>
                </label>
                <input
                  className="p-2 bg-white rounded-md border-2"
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  value={name}
                  onChange={onNameChanged}
                />
                <label className="text-sm" htmlFor="username">
                  Username: <span>[3-20 letters]</span>
                </label>
                <input
                  className="p-1 bg-white rounded-md border-2"
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
                  className="p-1 bg-white rounded-md border-2"
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
                  className="p-1 bg-white rounded-md border-2"
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
                  className="p-1 bg-white rounded-md border-2"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return <>{content}</>
}

export default NewUserForm
