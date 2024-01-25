import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import useAuth from '../../hooks/useAuth'
import DashFooter from '../dash/DashFooter'

const Layout = () => {
  const { username } = useAuth()
  // console.log(username)
  return (
    <>
      <Navbar />
      <Outlet />
      {username ? <DashFooter /> : <Footer />}
    </>
  )
}

export default Layout
