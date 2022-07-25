import Tippy from '@tippyjs/react'
import { useRef, useState, useEffect } from 'react'
import type { TippyProps } from '@tippyjs/react'

const Tip = ({ children, content, ...rest }: TippyProps) => {
  const spanRef = useRef<HTMLSpanElement>(null)
  const [childRef, setChildRef] = useState(null)

  useEffect(() => {
    if (spanRef.current)
      // @ts-ignore
      setChildRef(spanRef.current.previousElementSibling)

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
