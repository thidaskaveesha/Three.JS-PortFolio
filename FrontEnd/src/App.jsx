import React from 'react'
import Home from './pages/home'
import Portfolio from './pages/Portfolio'
import NotFound from './pages/NotFound'
import Game from './pages/Game'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Portfolio" element={<Portfolio />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App