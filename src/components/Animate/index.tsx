import styles from './styles.module.scss'
import { useState, useRef, useEffect, ReactNode } from 'react'

const Animate = ({ children, animation, delay, className, ...rest }: {
  children: ReactNode,
  animation: 'fadeUp' | 'fadeDown' | 'fadeRight' | 'fadeLeft' | 'fadeUpRight' | 'fadeUpLeft' | 'zoomIn' | 'zoomInUp' | 'zoomInDown' | 'zoomInRight' | 'zoomInLeft' | 'zoomOut' | 'zoomOutUp' | 'zoomOutDown' | 'zoomOutRight' | 'zoomOutLeft' | 'flipLeft' | 'flipRight' | 'flipUp' | 'flipDown',
  className?: string,
  delay?: number,
  [key: string]: any
}) => {
  const [isVisible, setVisible] = useState(false)
  const domRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting))
    })

    // @ts-ignore
    observer.observe(domRef.current)
  }, [])

  return (
    <div
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={`${styles[animation]}${isVisible ? ` ${styles.isVisible}` : ''}${className ? ` ${className}` : ''}`}
      // @ts-ignore
      ref={domRef}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Animate
