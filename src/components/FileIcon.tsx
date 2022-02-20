import React from 'react'
import python from '../assets/icons/python.svg'
import javascript from '../assets/icons/js.svg'
import rust from '../assets/icons/rust.svg'
import php from '../assets/icons/php.svg'
import html from '../assets/icons/html.svg'
import typescript from '../assets/icons/php.svg'
import go from '../assets/icons/go.svg'

import file from '../assets/icons/file_dark.svg'

const FileIcon = ({ extension }: {
  extension: string
}) => {
  if (extension === 'py') return <img src={python} />
  if (extension === 'js') return <img src={javascript} />
  if (extension === 'rs') return <img src={rust} />
  if (extension === 'php') return <img src={php} />
  if (extension === 'html') return <img src={html} />
  if (extension === 'typescript') return <img src={typescript} />
  if (extension === 'go') return <img src={go} />
  
  return <img src={file} />
}

export default FileIcon