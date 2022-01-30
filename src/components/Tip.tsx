import React from 'react'
import Tippy from '@tippyjs/react'
import { ReactNode } from 'react'

const Tip = ({ children, dynamic, noArrow, content, ...rest }: {
  children: any,
  dynamic?: boolean,
  noArrow?: boolean,
  content: string | ReactNode,
  [any: string]: any
}) => {
  return (
    dynamic ? (
      <Tippy animation='scale-subtle' arrow={!noArrow ?? true} content={content} {...rest}>
        <div>
          {children}
        </div>
      </Tippy>
    ) : (
      <Tippy animation='scale-subtle' arrow={!noArrow ?? true} content={content} {...rest}>
        {children}
      </Tippy>
    )
  )
}

export default Tip