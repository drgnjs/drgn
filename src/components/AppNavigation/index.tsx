import { appWindow } from '@tauri-apps/api/window'
import logo from '../../assets/logo.svg'
import Icon from '../Icon'
import styles from './styles.module.scss'

const AppNavigation = () => {
  return (
    <div className={styles.container} data-tauri-drag-region>
      <img className={styles.logo} src={logo} alt='drgn' />
      
      <nav className={styles.navigation}>
        <li onClick={() => appWindow.minimize()}>
          <Icon name='minimize' />
        </li>
        <li onClick={() => appWindow.toggleMaximize()}>
          <Icon name='square' />
        </li>
        <li onClick={() => appWindow.close()}>
          <Icon name='close' />
        </li>
      </nav>
    </div>
  )
}

export default AppNavigation
