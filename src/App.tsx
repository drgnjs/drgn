import React from 'react'
import Navigation from './components/Navigation'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Deploy from './pages/Deploy'
import OuterNavigation from './components/OuterNavigation'
import styles from './styles/App.module.scss'

const App = () => {
  return (
    <HashRouter>
      <OuterNavigation />

      <div className={styles.container}>
        <Navigation />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='about' element={<Deploy />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App