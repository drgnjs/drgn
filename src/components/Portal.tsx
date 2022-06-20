import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode} from 'react'

const Portal = ({ children }: {
  children: ReactNode
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted ? createPortal(children, document.querySelector('#portal') as Element) : null
}

export default Portal