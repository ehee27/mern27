import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import Loading from '../../components/Loading'
// import baum from '../../../public/assets/Baum-Walker-Stadium-1.png'
//
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
//
import usePersist from '../../hooks/usePersist'

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
  const [transition, setTransition] = useState(false)
  //
  const [login, { isLoading }] = useLoginMutation()
  //
  const [persist, setPersist] = usePersist()
  //-----------------------------------------------------
  useEffect(() => {
    userRef.current.focus()
  }, [])
  useEffect(() => {})
  //-----------------------------------------------------
  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)
  const handleToggle = () => setPersist(prev => !prev)
  //-----------------------------------------------------
  const onSaveUserClicked = async e => {
    e.preventDefault()
    // setTransition(true)
    // setTimeout(() => {
    //   setTransition(false)
    //   navigate('/dash')
    // }, 1000)
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

  if (transition)
    return (
      <>
        <Loading />
      </>
    )
  //-----------------------------------------------------
  const content = (
    <div className="min-h-screen grid w-[100%] bg-center bg-cover bg-[url('../../../public/assets/Baum-Walker-Stadium-1.png')]">
      <div className="hero-overlay bg-black bg-opacity-70">
        <div className="flex flex-col min-h-[100%] pt-20 text-white">
          <div className="py-10 px-6 mx-10 bg-black bg-opacity-60 rounded-lg shadow-lg shadow-zinc-900">
            <h1 className="font-sans text-sm md:text-2xl lg:text-5xl font-black p-5 text-center">
              Login
            </h1>
            <div className="flex flex-col justify-center items-center text-sm my-4">
              <form
                className="flex flex-col gap-2 bg-white rounded-lg w-[60%] p-8 text-gray-500"
                onSubmit={onSaveUserClicked}
              >
                <label className="text-sm" htmlFor="username">
                  Username: <span>[3-20 letters]</span>
                </label>
                <input
                  className="p-2 bg-white rounded-md border-2"
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
                  className="p-2 bg-white rounded-md border-2"
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  required
                  onChange={onPasswordChanged}
                />

                <div>
                  <button
                    className="btn bg-blue-500 text-white rounded.lg w-[100%] md:w-[65%] shadow-md shadow-gray-300 rounded-md p-1 mt-4"
                    title="Save"
                    // disabled={!canSave}
                  >
                    Login
                  </button>
                </div>
                <label htmlFor="persist">
                  <input
                    className="p-1 bg-white rounded-md mt-4"
                    type="checkbox"
                    id="persist"
                    onChange={handleToggle}
                    checked={persist}
                  />
                  Trust This Device
                </label>
                <div className="mt-2">
                  Dont have an account?{' '}
                  <Link className="text-green-700 font-black" to="/register">
                    Get Started
                  </Link>
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

export default Login
