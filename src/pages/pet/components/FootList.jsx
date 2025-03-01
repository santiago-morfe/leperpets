import { useContext, useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import PETS_DATA from '../../../data/petsData.ts'
import { PetsContext } from '../../../contexts/PetsContext.jsx'
import { InventoryContext } from '../../../contexts/InventoryContext.jsx'
import styles from './FootList.module.css'

const FootList = () => {
    const [isVisible, setIsVisible] = useState(false)
    const modalRef = useRef(null)
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
    }

    useEffect(() => {
        const handleClick = (e) => {

            // Si el clic fue fuera del modal, cerrar
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setIsVisible(false)
            }
        }

        // Solo agregar el listener cuando el modal esté visible
        if (isVisible) {
            // Usar setTimeout para agregar el listener en el siguiente ciclo
            // Esto evita que se cierre inmediatamente al abrir
            setTimeout(() => {
                document.addEventListener('click', handleClick)
            }, 0)
        }

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [isVisible])

    const toggleModal = (e) => {
        e.stopPropagation() // Evitar que el clic en el botón se propague
        setIsVisible(!isVisible)
    }

    if (!selectedPet.live) {
        const potion = items.find(item => item.name.toLowerCase() === 'pocion')
        return potion ? (
            <div>
                <button
                    className={styles.reviveButton}
                    onClick={toggleModal}
                    disabled={potion.cant < 1}
                >
                    Revivir
                </button>
                {isVisible && (
                    <div className={styles.modal} ref={modalRef}>
                        <button
                            className={styles.itemButton}
                            onClick={() => handleConsume(potion)}
                        >
                            {potion.name} ({potion.cant})
                        </button>
                    </div>
                )}
            </div>
        ) : <p>No hay pociones</p>
    }

    return (
        <div>
            <button
                className={styles.feedButton}
                onClick={toggleModal}
            >
                Alimentar
            </button>

            {isVisible && (
                <div className={styles.modal} ref={modalRef}>
                    <ul className={styles.itemList}>
                        {items.length > 0 ?
                            items.map((item) => (
                                <li key={item.id}>
                                    <button
                                        
                                        className={styles.itemButton}
                                        onClick={() => handleConsume(item)}
                                        disabled={item.cant < 1 || selectedPet.hunger >= 100}
                                    >
                                        {item.name} ({item.cant})
                                    </button>
                                </li>
                            ))
                            : <li>No hay items compatibles</li>
                        }
                    </ul>
                </div>
            )}
        </div>
    )
}

export default FootList