import { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'
import type { ReactNode , HTMLAttributes } from 'react'

interface Attributes extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  animation:
    | 'fadeUp'
    | 'fadeDown'
    | 'fadeRight'
    | 'fadeLeft'
    | 'fadeUpRight'
    | 'fadeUpLeft'
    | 'zoomIn'
    | 'zoomInUp'
    | 'zoomInDown'
    | 'zoomInRight'
    | 'zoomInLeft'
    | 'zoomOut'
    | 'zoomOutUp'
    | 'zoomOutDown'
    | 'zoomOutRight'
    | 'zoomOutLeft'
    | 'flipLeft'
    | 'flipRight'
    | 'flipUp'
    | 'flipDown'
  className?: string
  delay?: number
}

const Animate = ({ children, animation, delay, className, ...rest }: Attributes) => {
  const [isVisible, setVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting))
    })

    observer.observe(domRef.current as HTMLDivElement)
  }, [])

  return (
    <div
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={`${styles[animation]}${isVisible ? ` ${styles.isVisible}` : ''}${className ? ` ${className}` : ''}`}
      ref={domRef}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Animate
