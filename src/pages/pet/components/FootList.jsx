import { useContext, useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import PETS_DATA from '../../../data/petsData.ts'
import { PetsContext } from '../../../contexts/PetsContext.jsx'
import { InventoryContext } from '../../../contexts/InventoryContext.jsx'

const FootList = () => {
    const [isVisible, setIsVisible] = useState(false)
    const gameListRef = useRef(null)
    const { Inventory, addInventory, removeInventory } = useContext(InventoryContext)
    const { Pets, consume } = useContext(PetsContext)
    const { petId } = useParams()
    const selectedPet = Pets.find((pet) => pet.id == petId)
    const [petData] = PETS_DATA.filter((pet) => pet.type == selectedPet.type)
    const items = Inventory.filter((item) =>
        Object.keys(petData.compatibility).some(key => key.toLowerCase() === item.name.toLowerCase() || item.name.toLowerCase() === 'pocion')
    );

    const handleConsume = (item) => {
        if (item.cant < 1) return
        if (selectedPet.hunger >= 100) return
        consume(petId, item)
        removeInventory(item.id, 1)
    }

    const handleClick = (e) => {
        if (gameListRef.current && !gameListRef.current.contains(e.target)) {
            setIsVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    if (!selectedPet.live) return (
        <div>
            {items.filter((item) => item.name.toLowerCase() === 'pocion').map((item) => (
                <>
                    <p>pociones ({item.cant})</p>
                    <button key={item.id} onClick={() => handleConsume(item)}>Revivir</button>
                </>
            ))}
        </div>
    )

    return (
        <div ref={gameListRef}>
            <button onClick={() => setIsVisible(!isVisible)}>Alimentar</button>
            {isVisible && (
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            <button onClick={() => handleConsume(item)}>{item.name}({item.cant})  </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default FootList