import { Link } from 'react-router-dom'
import logo from '../../../public/assets/baseballLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../hooks/useAuth'

const links = [
  { name: 'Home', path: '/' },
  // { name: 'Single', path: '/single-column' },
  // { name: 'Two', path: '/two-column' },
  // { name: 'Three', path: '/three-column' },
  // { name: 'Mixed', path: '/mixed' },
]

const Navbar = () => {
  const { username, status } = useAuth()
  return (
    <div className="flex justify-around items-center bg-zinc-800 shadow-md shadow-gray-200 text-white py-2">
      <div className="flex items-center gap-4">
        <img src={logo} className="w-[35px] md:w-[45px]"></img>
        <p className="text-lg md:text-4xl font-sans font-black">SHOTIME</p>
      </div>
      <div className="flex gap-4">
        {links.map((item, i) => {
          return (
            <Link className="text-sm md:text-lg" key={i} to={item.path}>
              {item.name}
            </Link>
          )
        })}
        <Link to="/new-user">
          <FontAwesomeIcon icon={faUserPlus} />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
