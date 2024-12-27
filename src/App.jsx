import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PetsProvider } from './contexts/PetsContext'
import { InventoriProvider } from './contexts/InventoriContext'
import { WalletProvider } from './contexts/WalletContext'


const Home = lazy(() => import('./pages/home/HomeScreen'))
const Pet = lazy(() => import('./pages/pet/PetScreen'))
const Pets = lazy(() => import('./pages/pets/PetsScreen'))
const Play = lazy(() => import('./pages/play/PlayScreen'))
const Manual = lazy(() => import('./pages/manual/ManualScreen'))
const Shop = lazy(() => import('./pages/shop/ShopScreen'))

function App() {
  return (
    < WalletProvider >
      <InventoriProvider>
        <PetsProvider>
          <Suspense fallback={<div>Cargando...</div>}>
            <Routes>
              <Route path="*" element={<div>No encontrado</div>} />
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/manual" element={<Manual />} />
              <Route path="/pets" element={<Pets />} />
              <Route path="/pet/:petId" element={<Pet />} />
              <Route path="/play/:petId/:game" element={<Play />} />
              <Route path="/shop" element={<Shop />} />
            </Routes>
          </Suspense>
        </PetsProvider>
      </InventoriProvider>
    </WalletProvider>
  );
}

export default App
