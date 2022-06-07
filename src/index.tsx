import React from 'react'
import ReactDOM from 'react-dom'
import './styles/global.scss'
import styles from './styles/App.module.scss'

const App = () => {
  return (
    <div className={styles.lol}>
      <h1>This a test.</h1>
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
