import { createContext. useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import useAuth from "./useAuth";

const initialState = {
  thread: []
}

const getInitialState = () => {
  const thread = localStorage.getItem('thread')
  return thread ? JSON.parse(thread) : initialState
}

export const ThreadContext = createContext()

export const ThreadContentProvider = ({children}) => {
  const [thead, setThread] = useState(getInitialState)
  const {username} = useAuth()
  //
  useEffect(() => {
    {}
  })

  const addThread = threadContent => {
    setThread(prev => ({
      ...prev,
      thread: [...prev.thread, threadContent]
    }))
  }

  return (
    <ThreadContext.Provider value={{thread}}>
      {children}
    </ThreadContext.Provider>
  )

}

