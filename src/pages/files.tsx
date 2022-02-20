import React from 'react'
import styles from '../styles/Files.module.scss'
import FileIcon from '../components/FileIcon'

const files = [
  {
    name: 'image',
    extension: 'svg',
    size: 26733
  },
  {
    name: 'python',
    extension: 'py',
    size: 26733
  },
  {
    name: 'javascript',
    extension: 'js',
    size: 26733
  },
  {
    name: 'rust',
    extension: 'rs',
    size: 26733
  },
  {
    name: 'php',
    extension: 'php',
    size: 26733
  },
  {
    name: 'lol',
    extension: 'html',
    size: 26733
  },
  {
    name: 'php',
    extension: 'php',
    size: 26733
  },
  {
    name: 'g..olo.go',
    size: 26733
  }
]

export default () => {
  return (
    <div>
      <div className={styles.files}>
        {files.map(file => (
          <div className={styles.file}>
            <FileIcon extension={file.extension} />
            <p>{file.name}<span>.{file.extension}</span></p>
          </div>
        ))}
      </div>
    </div>
  )
}