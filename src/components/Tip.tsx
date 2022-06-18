import Tippy from '@tippyjs/react'
import type { TippyProps } from '@tippyjs/react'
import { ReactNode, useRef, useState, useEffect } from 'react'

interface TipConfig extends TippyProps {
  children: any,
  content: string | ReactNode,
  [any: string]: any
}

const Tip = ({ children, content, ...rest }: TipConfig) => {
  const spanRef = useRef(null)
  const [childRef, setChildRef] = useState(null)

  useEffect(() => {
    if (spanRef.current) setChildRef(spanRef.current.previousElementSibling)
    return () => setChildRef(null)
  }, [])

  return (
    <>
      {children}
      {childRef ? (
        <Tippy animation='scale-subtle' arrow={false} content={content} {...rest} reference={childRef} />
      ) : (
        <span ref={spanRef} style={{ display: 'none' }} />
      )}
    </>
  )
}

export default Tip
