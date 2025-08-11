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
import Map from './components/map.tsx'
import 'leaflet/dist/leaflet.css';
import RoutineForm from './components/RoutineForm.tsx'
import RoutineList from './components/RoutineList.tsx'

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
    <Route
      path="/map"
      element={
        <PrivateRoute>
          <Map />
        </PrivateRoute>
      }
    />
    <Route path="/routine" element={
        <PrivateRoute>
          <RoutineList />
        </PrivateRoute>
      }
    />
    <Route path="/routine/character/:characterId" element={
        <PrivateRoute>
          <RoutineList />
        </PrivateRoute>
      }
    />
    <Route path="/routine/place/:placeId" element={
        <PrivateRoute>
          <RoutineList />
        </PrivateRoute>
      }
    />
    <Route path="/createRoutine" element={
        <PrivateRoute>
          <RoutineForm />
        </PrivateRoute>
      }
    />
    <Route path="/createRoutine/character/:characterId" element={
        <PrivateRoute>
          <RoutineForm />
        </PrivateRoute>
      }
    />
    <Route path="/createRoutine/place/:placeId" element={
        <PrivateRoute>
          <RoutineForm />
        </PrivateRoute>
      }
    />
    <Route path="/editRoutine/:id" element={
        <PrivateRoute>
          <RoutineForm />
        </PrivateRoute>
      }
    />
    <Route path="*" element={<div>404</div>} />
  </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
