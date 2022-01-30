import React, { useState, ReactNode } from 'react'
import Icon from './Icon'
import styles from '../styles/Popup.module.scss'
import Portal from './Portal'

const Popup = ({ content, children, hideIcon }: {
  content: ReactNode,
  children: ReactNode,
  hideIcon?: boolean
}) => {
  const [visible, setVisibility] = useState(false)

  return (
    <>
      <Portal>
        <div className={visible ? styles.overlayActive : styles.overlay} onClick={() => setVisibility(false)}></div>
          <div className={visible ? styles.popupActive : styles.popup}>
          {!hideIcon && <Icon className={styles.icon} name='close' onClick={() => setVisibility(false)} />}
          {content}
        </div>
      </Portal>
      <div onClick={() => visible ? setVisibility(false) : setVisibility(true)}>
        {children}
      </div>
    </>
  )
}

export default Popup