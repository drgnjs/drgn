import { appWindow } from '@tauri-apps/api/window'
import Icon from '../Icon'
import styles from './styles.module.scss'
import logo from '../../assets/logo.svg'

const AppNavigation = () => {
  return (
    <div className={styles.container} data-tauri-drag-region>
      <div className={styles.branding}>
        <img src={logo} alt='drgn' />
        <p>drgn.js</p>
      </div>
      
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
