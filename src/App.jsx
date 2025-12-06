import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import {Outlet} from 'react-router-dom'
import { login, logout } from './features/authSlice'
import { Footer, Header } from './components'
import Login from './components/Login'
import Signup from './components/Signup'
import Rte from './components/Rte'

function App() {
  
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=> {
    authService.getCurrentUser()
      .then((userData) => {
        if(userData) {
          dispatch(login({userData}))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => (setLoading(false)))
  }, [])

  return !loading? (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header/>
        <Login/>
        <Rte/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ): (
    <div>
      <p>laoding!</p>
    </div>
  )
}

export default App
