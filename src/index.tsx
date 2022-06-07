import React from 'react'
import ReactDOM from 'react-dom'
import styles from './styles/App.module.scss'
import '@fontsource/poppins'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/800.css'
import '@fontsource/poppins/900.css'
import '@fontsource/poppins/400-italic.css'
import '@fortawesome/fontawesome-free/css/brands.css'
import 'material-symbols/outlined.css'
import 'material-symbols/rounded.css'
import './styles/global.scss'

const App = () => {
  return (
    <div className={styles.lol}>
      <h1>This a test.</h1>
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
