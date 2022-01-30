import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../styles/Navigation.module.scss'
import Icon from './Icon'

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <NavLink className={({ isActive }) => isActive ? styles.activeItem : styles.item} to='/other'>
        <Icon name='widgets' />
      </NavLink>
      <NavLink className={({ isActive }) => isActive ? styles.activeItem : styles.item} to='/other'>
        <Icon name='widgets' />
      </NavLink>
      <NavLink className={({ isActive }) => isActive ? styles.activeItem : styles.item} to='/other'>
        <Icon name='widgets' />
      </NavLink>
      <NavLink className={({ isActive }) => isActive ? styles.activeItem : styles.item} to='/deploy'>
        <Icon name='folder_open' />
      </NavLink>
      <NavLink className={({ isActive }) => isActive ? styles.activeItem : styles.item} to='/'>
        <Icon name='widgets' />
      </NavLink>
    </nav>
  )
}

export default Navigation