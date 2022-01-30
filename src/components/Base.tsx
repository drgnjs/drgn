import React, { ReactNode } from 'react'
import styles from '../styles/Base.module.scss'

const Base = ({ children }: {
  children: ReactNode
}) => {
  return (
    <div className={styles.base}>
      {children}
    </div>
  )
}

export default Base