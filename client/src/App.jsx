import { Routes, Route } from 'react-router-dom'
import Layout from './components/public/Layout'
import Public from './components/public/Public'
import Login from './features/auth/Login'
import DashLayout from './components/dash/DashLayout'
// import Welcome from './features/auth/Welcome'
import DashWelcome from './components/dash/DashWelcome'
import MessagesList from './features/messages/MessagesList'
import UserList from './features/users/UserList'
import NewUserForm from './features/users/NewUserForm'
import EditUser from './features/users/EditUser'
import NewMessage from './features/messages/NewMessage'
import EditMessage from './features/messages/EditMessage'
import Prefetch from './features/auth/Prefetch'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route element={<Prefetch />}>
          <Route path="dash" element={<DashLayout />}>
            {/* <Route index element={<Welcome />} /> */}
            <Route index element={<DashWelcome />} />

            <Route path="users">
              <Route index element={<UserList />} />
              <Route path=":id" element={<EditUser />} />
              <Route path="new" element={<NewUserForm />} />
            </Route>

            <Route path="messages">
              <Route index element={<MessagesList />} />
              <Route path=":id" element={<EditMessage />} />
              <Route path="new" element={<NewMessage />} />
            </Route>
          </Route>
        </Route>
        {/* End Dash */}
      </Route>
    </Routes>
  )
}

export default App
