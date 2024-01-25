import { createContext, useEffect, useState, usestate } from 'react'
import { useSelector } from 'react-redux'
import useAuth from '../hooks/useAuth'

const initialState = {
  games: [],
}

const getInitialState = () => {
  const games = localStorage.getItem('games')
  return games ? JSON.parse(games) : initialState
}

export const StatsContext = createContext()

export const StatsContextProvider = ({ children }) => {
  //
  const { username } = useAuth()

  const [games, setGames] = useState(getInitialState)
  const [stats, setStats] = useState([])

  const addGameStats = gameStats => {
    setGames(prev => ({
      ...prev,
      games: [...prev.games, gameStats],
    }))
  }
  return (
    <StatsContext.Provider value={{ games, addGameStats }}>
      {children}
    </StatsContext.Provider>
  )
}
