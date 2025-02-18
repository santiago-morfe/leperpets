import React, {
    useContext,
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
  } from 'react'
  import { useParams } from 'react-router-dom'
  import PETS_DATA from '../../../data/petsData.ts'
  import { PetsContext } from '../../../contexts/PetsContext.jsx'
  import { InventoryContext } from '../../../contexts/InventoryContext.jsx'
  
  const FootList = () => {
    const [isVisible, setIsVisible] = useState(false)
    const gameListRef = useRef(null)
  
    const { Inventory, removeInventory } = useContext(InventoryContext)
    const { Pets, consume } = useContext(PetsContext)
    const { petId } = useParams()
  
    // Buscamos la mascota seleccionada
    const selectedPet = useMemo(
        () => Pets.find((pet) => pet.id.toString() === petId),
        [Pets, petId]
      )
      
  
    if (!selectedPet) return <div>Pet no encontrado</div>
  
    // Obtenemos los datos de la mascota a partir de su tipo
    const petData = useMemo(
      () => PETS_DATA.find((pet) => pet.type === selectedPet.type),
      [selectedPet.type]
    )
  
    if (!petData) return <div>Datos del pet no encontrados</div>
  
    // Creamos un Set con las claves de compatibilidad en minúsculas para búsquedas rápidas
    const compatibilityKeys = useMemo(
      () => new Set(Object.keys(petData.compatibility).map((key) => key.toLowerCase())),
      [petData]
    )
  
    // Función para obtener el nivel de compatibilidad (del 1 al 3)
    const getCompatibilityRating = useCallback(
      (itemName) => {
        const key = Object.keys(petData.compatibility).find(
          (k) => k.toLowerCase() === itemName.toLowerCase()
        )
        return key ? petData.compatibility[key] : null
      },
      [petData]
    )
  
    // Filtramos los items del inventario: compatibles o, en caso especial, 'pocion'
    const filteredItems = useMemo(
      () =>
        Inventory.filter((item) => {
          const itemName = item.name.toLowerCase()
          return itemName === 'pocion' || compatibilityKeys.has(itemName)
        }),
      [Inventory, compatibilityKeys]
    )
  
    // Función para consumir un item (alimentar o revivir)
    const handleConsume = useCallback(
      (item) => {
        if (item.cant < 1 || selectedPet.hunger >= 100) return
        consume(petId, item)
        removeInventory(item.id, 1)
      },
      [consume, petId, removeInventory, selectedPet]
    )
  
    // Cierra el listado al hacer click fuera del contenedor
    const handleClickOutside = useCallback(
      (e) => {
        if (gameListRef.current && !gameListRef.current.contains(e.target)) {
          setIsVisible(false)
        }
      },
      []
    )
  
    useEffect(() => {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }, [handleClickOutside])
  
    // Si la mascota no está viva, mostramos solo la opción de revivir (con pociones)
    if (!selectedPet.live) {
      const revivalItems = filteredItems.filter(
        (item) => item.name.toLowerCase() === 'pocion'
      )
  
      return (
        <div>
          {revivalItems.map((item) => (
            <div key={item.id}>
              <p>Pociones ({item.cant})</p>
              <button onClick={() => handleConsume(item)}>Revivir</button>
            </div>
          ))}
        </div>
      )
    }
  
    return (
      <div ref={gameListRef}>
        <button onClick={() => setIsVisible((prev) => !prev)}>Alimentar</button>
        {isVisible && (
          <ul>
            {filteredItems.map((item) => {
              const itemName = item.name.toLowerCase()
              const rating = compatibilityKeys.has(itemName)
                ? getCompatibilityRating(item.name)
                : null
              return (
                <li key={item.id}>
                  <button onClick={() => handleConsume(item)}>
                    {item.name} ({item.cant})
                  </button>
                  {rating && <span> - Compatibilidad: {rating}</span>}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
  
  export default FootList
  