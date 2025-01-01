import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PetsProvider } from './contexts/PetsContext'
import { InventoryProvider } from './contexts/InventoryContext'
import { WalletProvider } from './contexts/WalletContext'
import { CartProvider } from './contexts/CartContext'


const Home = lazy(() => import('./pages/home/HomeScreen'))
const Pet = lazy(() => import('./pages/pet/PetScreen'))
const Pets = lazy(() => import('./pages/pets/PetsScreen'))
const Play = lazy(() => import('./pages/play/PlayScreen'))
const Manual = lazy(() => import('./pages/manual/ManualScreen'))
const Shop = lazy(() => import('./pages/shop/ShopScreen'))
const Product = lazy(() => import('./pages/product/ProductScreen'))

function App() {
  return (
    <CartProvider>
      <WalletProvider >
        <InventoryProvider>
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
                <Route path="/shop/:productId" element={<Product />} />
              </Routes>
            </Suspense>
          </PetsProvider>
        </InventoryProvider>
      </WalletProvider>
    </CartProvider >
  );
}

export default App
