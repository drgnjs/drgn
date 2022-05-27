import React from 'react'
import ReactDOM from 'react-dom'
import styles from './styles/test.module.css'

const App = () => {
  return (
    <div className={styles.lol}>Hello Man</div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
