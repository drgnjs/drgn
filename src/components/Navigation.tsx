import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../styles/Navigation.module.scss'
import Icon from './Icon'
import Tip from './Tip'
import { get } from '../modules/cache'
import Popup from './Popup'

const allowedProtocols = ['FTP', 'SFTP', 'S3']

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
      <Popup
        content={
          <div className={styles.addNewServer}>
            <h1>Connect to Server</h1>
            
            <label>
              <p><b>Protocol</b> {protocol && !allowedProtocols.includes(protocol) && <>- <b className={styles.inputError}>Must be either FTP, SFTP, or S3!</b></>}</p>
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
        isVisible
      >
        <Tip content='New Server' placement='right'>
          <NavLink className={({ isActive }) => isActive ? styles.activeItem : styles.item} to='/'>
            <Icon name='dashboard_customize' />
          </NavLink>
        </Tip>
      </Popup>
    </nav>
  )
}

export default Navigation