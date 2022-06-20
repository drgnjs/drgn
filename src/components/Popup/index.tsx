import { Dispatch, SetStateAction, useState } from 'react'
import Icon from '../Icon'
import Portal from '../Portal'
import styles from './styles.module.sass'
import type { ReactNode } from 'react'

const Popup = ({ content, children, isVisible, setVisibility, isVisibleByDefault, hideIcon }: {
  content: ReactNode,
  children?: ReactNode,
  isVisibleByDefault?: boolean,
  setVisibility?: Dispatch<SetStateAction<boolean>>,
  isVisible?: boolean,
  hideIcon?: boolean
}) => {
  const [fallbackIsVisible, fallbackSetVisibility] = useState(isVisibleByDefault === true)

  if (isVisible && setVisibility) return (
    <>
      <Portal>
        <div className={isVisible ? styles.overlayActive : styles.overlay} onClick={() => setVisibility(false)}></div>
        <div className={isVisible ? styles.popupActive : styles.popup}>
          {!hideIcon && <Icon className={styles.icon} name='close' onClick={() => setVisibility(false)} />}
          {content}
        </div>
      </Portal>
      {children &&
        <div onClick={() => setVisibility(!isVisible)}>
          {children}
        </div>
      }
    </>
  )

  return (
    <>
      <Portal>
        <div className={fallbackIsVisible ? styles.overlayActive : styles.overlay} onClick={() => fallbackSetVisibility(false)}></div>
        <div className={fallbackIsVisible ? styles.popupActive : styles.popup}>
          {!hideIcon && <Icon className={styles.icon} name='close' onClick={() => fallbackSetVisibility(false)} />}
          {content}
        </div>
      </Portal>
      {children &&
        <div onClick={() => fallbackSetVisibility(!fallbackIsVisible)}>
          {children}
        </div>
      }
    </>
  )
}

export default Popup
