import type { HTMLAttributes } from 'react'

interface Attributes extends HTMLAttributes<HTMLElement> {
  name: string
  outlined?: boolean
  filled?: boolean
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700
  fontawesome?: boolean
  className?: string
}

const Icon = ({ name, outlined, filled, weight, fontawesome, className, ...rest }: Attributes) => {
  if (fontawesome)
    return <i className={`fab${className ? ' ' + className : ''}`} style={{ fontStyle: 'normal' }} {...rest}>{name}</i>
  
  return <i className={`material-symbols-${outlined ? 'outlined' : 'rounded'}${className ? ' ' + className : ''}`} style={{ fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight ?? 400}, 'GRAD' 0, 'opsz' 48` }} {...rest}>{name}</i>
}

export default Icon
