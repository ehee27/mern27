import { Link } from 'react-router-dom'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faRightFromBracket,
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'

const Drawer = () => {
  const { username, isPlayer, isCoach } = useAuth()
  //
  const [drawerChecked, setDrawerChecked] = useState(false)
  //
  const onChecked = () => {
    setDrawerChecked(!drawerChecked)
  }

  return (
    <div className="drawer">
      {/* <div className={drawerStatus}> */}
      <input
        id="my-drawer"
        type="checkbox"
        checked={drawerChecked}
        onChange={onChecked}
        className="drawer-toggle"
      />

      <div className="drawer-content">
        {/* Page content here */}
        <label
          // onClick={() => setDrawerOpen()}
          htmlFor="my-drawer"
          className="btn btn-sm"
        >
          My Menu
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <Link onClick={onChecked} to="/dash/messages">
              View Messages
              <FontAwesomeIcon icon={faFilePen} className="text-gray-400" />
            </Link>
          </li>
          <li>
            <Link onClick={onChecked} to="/dash/messages/new">
              Create Message
              <FontAwesomeIcon icon={faFilePen} className="text-gray-400" />
            </Link>
          </li>
          <li>
            <Link onClick={onChecked} to="/dash/users">
              View Users
              <FontAwesomeIcon icon={faUserPlus} className="text-gray-400" />
            </Link>
          </li>
          {/* {isPlayer ? (
            <li>
              <Link onClick={onChecked} to="/dash/users/new">
                Create Users
              </Link>
            </li>
          ) : (
            <span></span>
          )} */}
          <li>
            <Link onClick={onChecked} to="/dash/users/new">
              Create Users
              <FontAwesomeIcon icon={faUserPlus} className="text-gray-400" />
            </Link>
          </li>
          <li>
            <Link onClick={onChecked} to="/dash">
              My Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Drawer
