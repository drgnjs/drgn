import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import UserContext from './contexts/UserContext'
import { User } from './types'
import '@fontsource/poppins'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/800.css'
import '@fontsource/poppins/900.css'
import '@fontsource/poppins/400-italic.css'
import '@fortawesome/fontawesome-free/css/brands.css'
import 'material-symbols/outlined.css'
import 'material-symbols/rounded.css'
import './index.scss'
import AppNavigation from './components/AppNavigation'
import styles from './app.module.scss'
import { Get } from './modules/fetch'

const App = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const [token, changeToken] = useState<string | null>(null)

  const setToken = (t: string | null) => {
    if (!t) window.localStorage.removeItem('token')
    else window.localStorage.setItem('token', t)

    changeToken(t)
  }

  useEffect(() => {
    // send data to api
      // os, drgn version, user id

    const fetchUser = async () => {
      const { ok, data } = await Get('/users/@me', {
        token: window.localStorage.getItem('token') as string
      })

      if (!ok)
        window.localStorage.deleteItem('token')

      setUser(data.user)
      console.log(user ?? 'is still null')
      changeToken(window.localStorage.getItem('token'))
    }

    if (window.localStorage.getItem('token') !== null)
      fetchUser()

    // prevent right click (production only)
    if (import.meta.env.PROD)
      document.addEventListener('contextmenu', e => {
        e.preventDefault()
      })

    setLoading(false)
  }, [])

  return loading ? (
    <div>
      Loading...
    </div>
  ) : (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      <MemoryRouter initialEntries={['/login']}>
        <div className={styles.app}>
          <AppNavigation />

          <div className={styles.base}>
            <Routes>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />

              <Route path='dashboard' element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </MemoryRouter>
    </UserContext.Provider>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
