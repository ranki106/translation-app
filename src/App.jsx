import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TranslationMain from './pages/translationMain.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<TranslationMain/>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
