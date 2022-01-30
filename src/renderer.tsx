import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import '@fontsource/poppins'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/800.css'
import '@fontsource/poppins/900.css'
import './styles/_global.scss'
import 'material-icons/iconfont/material-icons.css'
import '@fortawesome/fontawesome-free/css/brands.css'

(() => {
  ReactDOM.render(<App />, document.querySelector('#app'))
})()