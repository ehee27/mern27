import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faRightFromBracket,
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
import Drawer from './Drawer'
//
import useAuth from '../../hooks/useAuth'
//
const DASH_REGEX = /^\/dash(\/)?$/
const MESSAGES_REGEX = /^\/dash\/messages(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
  //
  const { isPlayer, isCoach } = useAuth()
  //
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation()
  //-----------------------------------------------------
  useEffect(() => {
    if (isSuccess) {
      navigate('/dash/messages')
    }
  }, [isSuccess, navigate])
  //-----------------------------------------------------
  const onNewMessageClicked = () => navigate('/dash/messages/new')
  const onMessagesClicked = () => navigate('/dash/messages')
  const onNewUserClicked = () => navigate('/dash/users/new')
  const onUsersClicked = () => navigate('/dash/users')
  //-----------------------------------------------------
  const handleLogout = () => {
    sendLogout()
    navigate('/')
  }
  //-----------------------------------------------------
  let newMessagesButton = null
  if (MESSAGES_REGEX.test(pathname)) {
    newMessagesButton = (
      <button
        className="text-white text-m md:text-2xl"
        title="New Message"
        onClick={onNewMessageClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    )
  }
  //--------------
  let messagesButton = null
  if (!MESSAGES_REGEX.test(pathname) && pathname.includes('/dash')) {
    messagesButton = (
      <button
        className="text-white text-m md:text-2xl"
        title="Messages"
        onClick={onMessagesClicked}
      >
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    )
  }
  //--------------
  let newUserButton = null
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className="text-white text-m md:text-2xl"
        title="New User"
        onClick={onNewUserClicked}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    )
  }
  //--------------
  let usersButton = null
  if (isPlayer || isCoach) {
    if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
      usersButton = (
        <button
          className="text-white text-m md:text-2xl"
          title="Users"
          onClick={onUsersClicked}
        >
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      )
    }
  }

  //-----------------------------------------------------
  if (isLoading) return <p>Logging Out...</p>

  if (isError) return <p>Error: {error.data?.message}</p>

  let dashClass = null
  if (
    !DASH_REGEX.test(pathname) &&
    !MESSAGES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = 'visible'
  }
  //-----------------------------------------------------
  const logoutButton = (
    <button
      // className="icon-button"
      className={`text-md md:text-2xl text-red-400 ${dashClass}`}
      title="Logout"
      onClick={handleLogout}
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  )
  //-----------------------------------------------------
  let buttonContent
  if (isLoading) {
    buttonContent = <p>Logging Out...</p>
  } else {
    buttonContent = (
      <div className="flex gap-4">
        {newMessagesButton}
        {newUserButton}
        {messagesButton}
        {usersButton}
        {logoutButton}
      </div>
    )
  }

  const content = (
    <div className="flex bg-zinc-700 p-1">
      <Drawer />
      {buttonContent}
    </div>
  )

  return content
}
export default DashHeader
