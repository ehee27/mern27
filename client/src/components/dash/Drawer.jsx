import { Link } from 'react-router-dom'

const Drawer = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="btn btn-accent text-white rounded.lg w-[10%] rounded-md p-1 drawer-button"
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
            <Link to="/dash/messages">View Messages</Link>
          </li>
          <li>
            <Link to="/dash/messages/new">Create Message</Link>
          </li>
          <li>
            <Link to="/dash/users">View Users</Link>
          </li>
          <li>
            <Link to="/dash/users/new">Create Users</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Drawer
