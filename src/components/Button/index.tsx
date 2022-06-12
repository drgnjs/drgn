import { ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

interface Attributes extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  color?: string
  disabled?: boolean
  size?: string
}

const Button = ({ disabled, color, size, href, children, onClick, ...rest }: Attributes) => {
  let classes = ''

  if (disabled) classes += styles.disabled
  else if (color) classes += styles[color]
  else classes += styles.gray

  if (size) classes = `${classes} ${styles[size]}`
  else classes = `${classes} ${styles.small}`
  
  return href && !href.startsWith('http') ? (
    <Link to={href}>
      <button className={classes} {...rest}>{children}</button>
    </Link>
  ) : (
    <button className={classes} onClick={onClick ? onClick : href ? () => open(href) : undefined} {...rest}>{children}</button>
  )
}

export default Button
