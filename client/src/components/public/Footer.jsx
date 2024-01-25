import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  //

  const onGoHomeClicked = () => navigate('/dash')

  let goHomeButton = null
  if (pathname !== '/dash') {
    goHomeButton = (
      <button
        className="btn btn-accent text-white rounded-md p-1 w-[50px]"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    )
  }

  return (
    <div className="sticky footer inset-x-0 bottom-0 flex flex-col gap-2 bg-zinc-950 text-white py-2 px-5">
      <Link to="/">
        <p className="font-sans">FOOTER</p>
      </Link>
      <Link to="/">{goHomeButton}</Link>
    </div>
  )
}

export default Footer
