import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import packageJson from '../package.json'
import styles from './app.module.sass'
import AppNavigation from './components/AppNavigation'
import UserMenu from './components/UserMenu'
import UserContext from './contexts/UserContext'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import type { User } from './types'
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
import './index.sass'
// import Preferences from './pages/Preferences'

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
    const sendData = async () => {
      try {
        await fetch((import.meta.env.DEV ? 'http://localhost:5000' : 'https://api.drgnjs.com') + '/insights', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'drgn-version': packageJson.version,
            'authorization': `bearer ${token ?? window.localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            // @ts-ignore
            os: window.navigator?.userAgentData?.platform || window.navigator?.platform || 'unknown',
            version: packageJson.version
          })
        })
      } catch (err) {
        console.log('Could not post insights.')
      }
    }

    if (user)
      sendData()
  }, [user])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch((import.meta.env.DEV ? 'http://localhost:5000' : 'https://api.drgnjs.com') + '/users/@me', {
          headers: {
            accept: 'application/json',
            'drgn-version': packageJson.version,
            'authorization': `bearer ${token ?? window.localStorage.getItem('token')}`
          }
        })

        if (res.status === 200) {
          setUser((await res.json()).user)
          changeToken(window.localStorage.getItem('token'))
        } else {
          window.localStorage.removeItem('token')
        }
      } catch (err) {
        window.localStorage.removeItem('token')
      }
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

          <div className={styles.baseWrapper}>
            {user && <UserMenu />}

            <div className={styles.baseBackground}>
              <div className={styles.base}>
                <Routes>
                  <Route path='login' element={<Login />} />
                  <Route path='register' element={<Register />} />

                  <Route path='dashboard' element={<Dashboard />} />
                  {/* <Route path='preferences' element={<Preferences />} /> */}
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </MemoryRouter>
    </UserContext.Provider>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
