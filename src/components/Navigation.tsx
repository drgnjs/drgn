import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../styles/Navigation.module.scss'
import Icon from './Icon'
import Tip from './Tip'
import Popup from './Popup'
import { protocols } from '../config.json'
import { version } from '../../package.json'

const Navigation = () => {
  const exists = false
  const [protocol, setProtocol] = useState<string>(null)

  return (
    <nav className={styles.navigation}>
      {exists &&
        <>
          <Tip content='Apps' placement='right'>
            <NavLink className={({ isActive }) => isActive ? styles.activeItem : styles.item} to='/apps'>
              <Icon name='widgets' />
            </NavLink>
          </Tip>
          <span className={styles.separator}></span>
        </>
      }
      <Tip content='Files' placement='right'>
        <NavLink className={({ isActive }) => isActive ? styles.activeItem : styles.item} to='/files'>
          <Icon name='folder_open' />
        </NavLink>
      </Tip>
      <Tip content='Servers' placement='right'>
        <NavLink className={({ isActive }) => isActive ? styles.activeItem : styles.item} to='/servers'>
          <Icon name='dns' />
        </NavLink>
      </Tip>
      <Tip content='New Server' placement='right'>
        <NavLink className={({ isActive }) => isActive ? styles.activeItem : styles.item} to='/'>
          <Icon name='home' />
        </NavLink>
      </Tip>
      <span className={styles.separator}></span>
      <Popup
        content={
          <div className={styles.addNewServer}>
            <h1>Connect to Server</h1>
            
            <label>
              <p><b>Protocol</b> {protocol && !protocols.includes(protocol) && <>- <b className={styles.inputError}>Must be either FTP, SFTP, or S3!</b></>}</p>
              <input type='text' placeholder='e.g. SFTP' onChange={e => setProtocol(e.target.value.toUpperCase())} />
            </label>
            <div className={styles.specialRow}>
              <label>
                Host
                <input type='text' placeholder='e.g. 127.0.0.1' />
              </label>
              <label>
                Port
                <input readOnly value={protocol === 'FTP' ? 21 : protocol === 'S3' ? 443 : protocol === 'SFTP' ? 22 : ''} placeholder='...' />
              </label>
            </div>
            <div className={styles.row}>
              <label>
                Username
                <input type='text' placeholder='e.g. admin' />
              </label>
              <label>
                Password
                <input type='password' />
              </label>
            </div>
          </div>
        }
        //isVisible
        isCloseable
      >
        <Tip content='New Server' placement='right'>
          <div className={styles.item}>
            <Icon name='dashboard_customize' />
          </div>
        </Tip>
      </Popup>

      <p className={styles.version}>v{version}</p>
    </nav>
  )
}

export default Navigation