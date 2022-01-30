import React from 'react'
import styles from '../styles/OuterNavigation.module.scss'
import Icon from './Icon'

const OuterNavigation = () => {
  return (
    <nav className={styles.outerNavigation}>
      <span className={styles.action} onClick={() => {}}>
        <Icon name='minimize' />
      </span>
      <span className={styles.action} onClick={() => {}}>
        <Icon name='crop_square' />
      </span>
      <span className={styles.action} onClick={() => {}}>
        <Icon name='close' />
      </span>
    </nav>
  )
}

export default OuterNavigation