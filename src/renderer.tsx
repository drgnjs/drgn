import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Navigation from './components/Navigation'
import { HashRouter, Routes, Route } from 'react-router-dom'
import OuterNavigation from './components/OuterNavigation'
import styles from './styles/App.module.scss'
import Home from './pages'
import Deploy from './pages/deploy'
import '@fontsource/poppins'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/800.css'
import '@fontsource/poppins/900.css'
import 'material-icons/iconfont/material-icons.css'
import '@fortawesome/fontawesome-free/css/brands.css'
import './styles/_global.scss'

(() => {
  ReactDOM.render(
    <HashRouter>
      <OuterNavigation />

      <div className={styles.container}>
        <Navigation />
      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='deploy' element={<Deploy />} />
        </Routes>
      </div>
    </HashRouter>
  , document.querySelector('#app'))
})()