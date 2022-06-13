import { FormEvent, useContext, useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import Animate from '../../components/Animate'
import Button from '../../components/Button'
import Icon from '../../components/Icon'
import UserContext from '../../contexts/UserContext'
import { Post } from '../../modules/fetch'
import styles from './styles.module.scss'

const Login = () => {
  const [error, setError] = useState<string | null>(null)
  
  const { user, setUser, setToken } = useContext(UserContext)

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const email = (e.target as HTMLFormElement).email.value
    const password = (e.target as HTMLFormElement).password.value

    const login = await Post('/login', {
      body: {
        email,
        password
      }
    })

    if (login.ok) {
      setUser(login.data.user)
      setToken(login.data.token)
    } else {
      setError(login.data.message)
    }
  }

  const retry = () => {
    setError(null)
  }

  return user ? (
    <Navigate replace to='/dashboard' />
  ) : error === 'too much tries' ? (
    <div className={styles.error}>
      <h3>Too Much Tries</h3>
      <p>You will have to wait about an hour before you can sign in again.</p>
    </div>
  ) : error === 'invalid email' ? (
    <div className={styles.error}>
      <h3>Invalid E-Mail</h3>
      <span onClick={retry}>Try again</span>
    </div>
  ) : error === 'invalid token' ? ( 
    <div className={styles.error}>
      <h3>Invalid Token</h3>
      <p>Please enter the token we sent you by email.</p>
      <span onClick={retry}>Try again</span>
    </div>
  ) : error === 'invalid password' ? ( 
    <div className={styles.error}>
      <h3>Invalid Password</h3>
      <p>The password you typed was wrong.</p>
      <span onClick={retry}>Try again</span>
    </div>
  ) : error === 'missing pin' ? (  // 2fa, code required
    <div>
      {/* coming soon, not needed at the moment */}
    </div>
  ) : error === 'invalid pin' ? ( 
    <div className={styles.error}>
      <h3>Invalid 2FA Pin</h3>
      <span onClick={retry}>Try again</span>
    </div>
  ) : (
    <div className={styles.container}>
      <Animate animation='fadeDown'>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>

          <fieldset>
            <label>E-Mail
              <input
                name='email'
                type='email'
                minLength={6}
                maxLength={64}
              />
            </label>

            <label>Password
              <input
                name='password'
                type='password'
                minLength={8}
                maxLength={64}
              />
            </label>
          </fieldset>

          <Button type='submit'>Continue</Button>
        </form>
      </Animate>

      <nav>
        <NavLink to='/login' className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
          <Icon name='login' />
          Login
        </NavLink>
        <span></span>
        <NavLink to='/register' className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
          <Icon name='person_add' />
          Register
        </NavLink>
      </nav>
    </div>
  )
}

export default Login
