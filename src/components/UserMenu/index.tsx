import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import Avatar from '../Avatar'
import Icon from '../Icon'
import Tip from '../Tip'
import styles from './styles.module.sass'

const UserMenu = () => {
  const [showMenu, setMenuVisibility] = useState<boolean>(false)

  const { user, setUser, setToken } = useContext(UserContext)

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  return user ? (
    <Tip
      content={
        <div className={styles.userMenu}>
          <Link to='/preferences'>
            <Icon name='settings' filled />
            Preferences
          </Link>
          <span className={styles.danger} onClick={logout}>
            <Icon name='logout' />
            Logout
          </span>
        </div>
      }
      visible={showMenu}
      onClickOutside={() => setMenuVisibility(false)}
      placement='right-end'
      interactive
      theme='menu'
    >
      <div className={styles.wrapper} onClick={() => setMenuVisibility(!showMenu)}>
        <Avatar seed={user.email} />
      </div>
    </Tip>
  ) : null
}

export default UserMenu
