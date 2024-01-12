import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
//
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //
  const userRef = useRef()
  const errRef = useRef()
  //
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  //
  const [login, { isLoading }] = useLoginMutation()
  //
  useEffect(() => {
    userRef.current.focus()
  }, [])
  useEffect(() => {})

  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)
  //
  const onSaveUserClicked = async e => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      navigate('/dash')
    } catch (err) {
      if (!err.status) {
        setErrorMessage('No Server Response')
      } else if (err.status === 400) {
        setErrorMessage('Missing Username or Password')
      } else if (err.status === 401) {
        setErrorMessage('Unauthorized')
      } else {
        setErrorMessage(err.data?.message)
      }
      errRef.current.focus()
    }
  }

  if (isLoading) return <p>Loading...</p>

  const content = (
    <div className="p-3 bg-gray-100 h-[80vh]">
      <h1 className="font-sans text-xl md:text-2xl lg:text-4xl p-5">
        Login Page
      </h1>
      {/* --- GRID START ----- */}
      <div className="grid grid-cols-1">
        {/* ----------------- */}
        <div className="flex flex-col gap-3 my-1 border-2 bg-gray-100 p-5 rounded-md">
          {/* <h2 className="text-xl md:text-2xl lg:text-3xl">Login</h2> */}
          <form
            className="flex flex-col gap-2 shadow-md shadow-gray-400 p-3 w-[50%]"
            onSubmit={onSaveUserClicked}
          >
            <div>
              <h2>Login</h2>
            </div>
            <label className="text-sm" htmlFor="username">
              Username: <span>[3-20 letters]</span>
            </label>
            <input
              className="p-1 bg-white rounded-md"
              id="username"
              name="username"
              type="text"
              ref={userRef}
              autoComplete="off"
              value={username}
              required
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
              required
              onChange={onPasswordChanged}
            />

            <div>
              <button
                className="btn bg-blue-500 text-white rounded.lg w-[20%] shadow-md shadow-gray-300 rounded-md p-1"
                title="Save"
                // disabled={!canSave}
              >
                Login
              </button>
            </div>
          </form>
          <Link to="/">
            <button className="btn btn-accent text-white rounded.lg w-[20%] shadow-md shadow-gray-300 rounded-md p-1">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
      {/* ----------------- */}
    </div>
  )

  return <>{content}</>
}

export default Login
