import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import Icon from '../../components/Icon'
import UserContext from '../../contexts/UserContext'
import styles from './styles.module.scss'

const Dashboard = () => {
  const { user, setUser, setToken } = useContext(UserContext)

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  return user ? (
    <div className={styles.container}>
      <div className={styles.top}>
        <Avatar seed={user.email} />
        <Icon name='logout' onClick={logout} />
      </div>

      <div className={styles.bottom}>
        <h2>{user.email}</h2>
        <p>Signup #{user.signupNumber}</p>

        <span>More coming soon!</span>
      </div>
    </div>
  ) : <Navigate replace to='/login' />
}

export default Dashboard
