import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isPlayer = false
  let isCoach = false
  let status = 'Player'
  let ID = ''
  let playerStats = []

  if (token) {
    const decoded = jwtDecode(token)
    const { username, roles, userID, stats } = decoded.UserInfo

    isPlayer = roles.includes('Player')
    isCoach = roles.includes('Coach')
    ID = userID
    playerStats = stats

    if (isPlayer) status = 'Player'
    if (isCoach) status = 'Coach'

    return { username, roles, status, isPlayer, isCoach, ID, stats }
  }

  return { username: '', roles: [], isPlayer, isCoach, status, playerStats }
}
export default useAuth
