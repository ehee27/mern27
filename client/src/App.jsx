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
import UserProfile from './features/users/UserProfile'
import NewMessage from './features/messages/NewMessage'
import MessageDetails from './features/messages/MessageDetails'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* ---- PUBLIC ROUTES ---- */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<NewUserForm />} />
        <Route path="new-user" element={<NewUserForm />} />
        {/* ------- PROTECTED ROUTES --------- */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              {/* ------- DASH --------- */}
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<DashWelcome />} />
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Player, ROLES.Coach]} />
                  }
                >
                  {/* ------- USERS --------- */}
                  <Route path="users">
                    <Route index element={<UserList />} />
                    <Route path=":id" element={<UserProfile />} />
                    {/* <Route path="new" element={<NewUserForm />} /> */}
                  </Route>
                </Route>
                {/* ------- MESSAGES --------- */}
                <Route path="messages">
                  <Route index element={<MessagesList />} />
                  <Route path=":id" element={<MessageDetails />} />
                  <Route path="new" element={<NewMessage />} />
                </Route>
              </Route>
            </Route>
            {/* ---- End PROTECTED ROUTES / Dash --- */}
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
