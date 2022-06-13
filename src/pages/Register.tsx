import { FormEvent, useContext, useEffect, useState } from 'react'
import { Link, Navigate, NavLink } from 'react-router-dom'
import Animate from '../components/Animate'
import Button from '../components/Button'
import Icon from '../components/Icon'
import UserContext from '../contexts/UserContext'
import { Post } from '../modules/fetch'
import styles from './Login/styles.module.scss'

const Register = () => {
  const [error, setError] = useState<string | null>(null)
  const [waiting, setWaiting] = useState<boolean>()

  const { user } = useContext(UserContext)

  const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const email = (e.target as HTMLFormElement).email.value
    const password = (e.target as HTMLFormElement).password.value
    const repeatPassword = (e.target as HTMLFormElement).repeat_password.value

    if (password !== repeatPassword) return setError('different passwords')

    const register = await Post('/register', {
      body: {
        email,
        password
      }
    })

    if (register.ok) {
      setWaiting(true)
    } else {
      setError(register.data.message)
    }
  }

  const retry = () => {
    setError(null)
  }

  return user ? (
    <Navigate replace to='/dashboard' />
  ) : error === 'email already taken' ? (
    <div className={styles.error}>
      <h3>E-Mail Already Taken</h3>
      <span onClick={retry}>Try again</span>
    </div>
  ) : error === 'different passwords' ? (
    <div className={styles.error}>
      <h3>Repeat the Password</h3>
      <p>You need to specify the same password twice.</p>
      <span onClick={retry}>Try again</span>
    </div>
  ) : waiting ? (
    <div className={styles.error}>
      <p>We've sent you an email. Click on the link we sent you before trying to log in.</p>
      <Link to='/login'>Sign in</Link>
    </div>
  ) : (
    <div className={styles.container}>
      <Animate animation='fadeDown'>
        <form onSubmit={handleRegistration}>
          <h1>Register</h1>

          <fieldset>
            <label>E-Mail
              <input
                name='email'
                type='email'
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

            <label>Repeat Password
              <input
                name='repeat_password'
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

export default Register
