import React from 'react'

const Icon = ({ name, outline, fontawesome, className, ...rest }: {
  name: string,
  outline?: boolean,
  fontawesome?: boolean,
  className?: string,
  [any: string]: any
}) => {
  let classes = `material-icons-${outline ? 'outlined' : 'round'}`
  if (fontawesome) classes = 'fab'
  if (className) classes += ` ${className}`

  return <i className={classes} {...rest}>{name}</i>
}

export default Icon