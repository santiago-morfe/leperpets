import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import PETS_DATA from '../../../data/petsData.ts'
import { PetsContext } from '../../../contexts/PetsContext.jsx'
import { InventoryContext } from '../../../contexts/InventoryContext.jsx'

const FootList = () => {
    const { Inventory, addInventory, removeInventory } = useContext(InventoryContext)
    const { Pets, feed, play, rest, age, consume } = useContext(PetsContext)
    const { petId } = useParams()
    const selectedPet = Pets.find((pet) => pet.id == petId)
    const [ petData ] = PETS_DATA.filter((pet) => pet.type == selectedPet.type)
    const items = Inventory.filter((item) => 
        Object.keys(petData.compatibility).some(key => key.toLowerCase() === item.name.toLowerCase() || item.name.toLowerCase() === 'pocion')
    );
    
    const handleConsume = (item) => {
        if (item.cant < 1) return
        if (selectedPet.hunger >= 100) return
        consume(petId, item)
        removeInventory(item.id, 1)
    }
    


    return (
        <div>
            <h2>Items</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.cant}</p>
                        <p>{item.baseValue}</p>
                        <button onClick={() => handleConsume(item)}>Consumir</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FootList