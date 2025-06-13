import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CharacterList from './components/CharacterList'
import CharacterTab from './components/CharacterTab.tsx'
import React from 'react'
import './index.css';
import "./i18n"; // importa a configuração de idiomas
import LanguageSelector from './components/LanguageSelector';
import Login from './components/Login';
import PrivateRoute from './routes/PrivateRoute';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <LanguageSelector />
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      path="/"
      element={
        <PrivateRoute>
          <CharacterList />
        </PrivateRoute>
      }
    />
    <Route
      path="/create"
      element={
        <PrivateRoute>
          <CharacterTab />
        </PrivateRoute>
      }
    />
    <Route
      path="/edit/:id"
      element={
        <PrivateRoute>
          <CharacterTab />
        </PrivateRoute>
      }
    />
    <Route path="*" element={<div>404</div>} />
  </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
