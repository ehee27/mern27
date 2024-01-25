import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
// import lockerRoom from '../../../public/assets/lockerRoom.png'

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <Outlet />
      {/* <DashFooter /> */}
    </>
  )
}

export default DashLayout
