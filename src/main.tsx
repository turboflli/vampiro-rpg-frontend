import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CharacterList from './components/CharacterList'
import CharacterTab from './components/CharacterTab.tsx'
import React from 'react'
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/create" element={<CharacterTab />} />
        <Route path="/edit/:id" element={<CharacterTab />} />
        <Route path="*" element={<div>404 - Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
