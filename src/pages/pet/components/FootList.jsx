import { useContext, useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import PETS_DATA from '../../../data/petsData.ts'
import { PetsContext } from '../../../contexts/PetsContext.jsx'
import { InventoryContext } from '../../../contexts/InventoryContext.jsx'
import styles from './FootList.module.css'

const FootList = () => {
    const [isVisible, setIsVisible] = useState(false)
    const gameListRef = useRef(null)
    const { Inventory, removeInventory } = useContext(InventoryContext)
    const { Pets, consume } = useContext(PetsContext)
    const { petId } = useParams()

    const selectedPet = Pets.find((pet) => pet.id == petId)
    const [petData] = PETS_DATA.filter((pet) => pet.type == selectedPet.type)
    const items = Inventory.filter((item) =>
        Object.keys(petData.compatibility).some(key =>
            key.toLowerCase() === item.name.toLowerCase() ||
            item.name.toLowerCase() === 'pocion'
        )
    )

    const handleConsume = (item) => {
        if (item.cant < 1 || selectedPet.hunger >= 100) return
        consume(petId, item)
        removeInventory(item.id, 1)
        setIsVisible(false)
    }

    const handleClick = (e) => {
        if (gameListRef.current && !gameListRef.current.contains(e.target)) {
            setIsVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    if (!selectedPet.live) {
        const potion = items.find(item => item.name.toLowerCase() === 'pocion')
        return potion ? (
            <div  ref={gameListRef}>
                <button
                    ref={gameListRef}
                    className={styles.reviveButton}
                    onClick={() => setIsVisible(!isVisible)}
                    disabled={potion.cant < 1}
                >
                    Revivir
                </button>
                {isVisible && (
                    <div className={styles.modal}>
                        <button
                            className={styles.itemButton}
                            onClick={() => handleConsume(potion)}
                        >
                            {potion.name} ({potion.cant})
                        </button>
                    </div>
                )}
            </div>
        ) : null
    }

    return (
        <div ref={gameListRef}>
            <button
                className={styles.feedButton}
                onClick={() => setIsVisible(!isVisible)}
            >
                Alimentar
            </button>

            {isVisible && (
                <div className={styles.modal}>
                    <ul className={styles.itemList}>
                        {items.map((item) => (
                            <li key={item.id}>
                                <button
                                    className={styles.itemButton}
                                    onClick={() => handleConsume(item)}
                                    disabled={item.cant < 1 || selectedPet.hunger >= 100}
                                >
                                    {item.name} ({item.cant})
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default FootList