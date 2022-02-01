import React from 'react'
import styles from '../styles/Base.module.scss'
import { Outlet } from 'react-router-dom'

const Base = () => {
  return (
    <div className={styles.base}>
      <Outlet />
    </div>
  )
}

export default Base