import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PetsProvider } from './contexts/PetsContext'

const Home = lazy(() => import('./pages/home/HomeScreen'))
const Pet = lazy(() => import('./pages/pet/PetScreen'))
const Pets = lazy(() => import('./pages/pets/PetsScreen'))
const Play = lazy(() => import('./pages/play/PlayScreen'))

function App() {
  return (
    <PetsProvider>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="*" element={<div>No encontrado</div>} />
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pet/:petId" element={<Pet />} />
          <Route path="/play/:petId/:juego" element={<Play/> } />
        </Routes>
      </Suspense>
    </PetsProvider>
  );
}

export default App
