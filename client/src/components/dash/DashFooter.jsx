import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const DashFooter = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  //
  const { username, status } = useAuth()

  const onGoHomeClicked = () => navigate('/dash')

  let goHomeButton = null
  if (pathname !== '/dash') {
    goHomeButton = (
      <button
        className="btn btn-accent text-white rounded.lg w-[5%] rounded-md p-1"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    )
  }

  return (
    <div className="sticky footer inset-x-0 bottom-0 flex flex-col gap-2 bg-zinc-950 text-white py-2 px-5">
      <Link to="/">
        <p className="font-sans">DASH FOOTER</p>
      </Link>
      <Link to="/">{goHomeButton}</Link>
      <p className="text-sm">Current User: {username}</p>
      <p className="text-sm">Status: {status}</p>
    </div>
  )
}

export default DashFooter
