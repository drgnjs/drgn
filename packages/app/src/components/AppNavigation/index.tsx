import { appWindow } from '@tauri-apps/api/window'
import Icon from '../Icon'
import styles from './styles.module.sass'

const AppNavigation = () => {
  return (
    <div className={styles.container} data-tauri-drag-region>
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
