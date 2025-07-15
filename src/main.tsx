import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CharacterList from './components/CharacterList'
import CharacterTab from './components/CharacterTab.tsx'
import React from 'react'
import './index.css';
import "./i18n"; // importa a configuração de idiomas
import Login from './components/Login';
import PrivateRoute from './routes/PrivateRoute';
import DomainList from './components/DomainList';
import DomainForm from './components/DomainForm';
import PlaceList from './components/PlaceList';
import PlaceForm from './components/PlaceForm';
import Menu from './components/Menu.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Menu />
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
    <Route
      path="/domain"
      element={
        <PrivateRoute>
          <DomainList />
        </PrivateRoute>
      }
    />
    <Route
      path="/createDomain"
      element={
        <PrivateRoute>
          <DomainForm />
        </PrivateRoute>
      }
    />
    <Route
      path="/editDomain/:id"
      element={
        <PrivateRoute>
          <DomainForm />
        </PrivateRoute>
      }
    />
    <Route
      path="/place"
      element={
        <PrivateRoute>
          <PlaceList />
        </PrivateRoute>
      }
    />
    <Route
      path="/createPlace"
      element={
        <PrivateRoute>
          <PlaceForm />
        </PrivateRoute>
      }
    />
    <Route
      path="/editPlace/:id"
      element={
        <PrivateRoute>
          <PlaceForm />
        </PrivateRoute>
      }
    />
    <Route path="*" element={<div>404</div>} />
  </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
