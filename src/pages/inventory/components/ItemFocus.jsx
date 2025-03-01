import { useMemo, useContext, useRef, useState, useEffect } from 'react'
import { InventoryContext } from '../../../contexts/InventoryContext'
import { WalletContext } from '../../../contexts/WalletContext'
import { PetsContext } from '../../../contexts/PetsContext'
import styles from './ItemInventory.module.css'
import PETS_DATA from '../../../data/petsData'

const ItemInventory = ({ item, setFocus }) => {
    const { removeInventory } = useContext(InventoryContext)
    const { Pets, consume } = useContext(PetsContext)
    const { addMoney } = useContext(WalletContext)
    const [isPocion, setIsPocion] = useState(item.name.toLowerCase() === 'pocion')
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef(null)
    const ulRef = useRef(null)

    const petCompatible = useMemo(() => {
        if (!item || !PETS_DATA || !Pets) return []

        // si el item es pocion, filtrar solo las mascotas muertas
        if (item.name.toLowerCase() === 'pocion') {
            return Pets.filter(pet => !pet.live)
        }

        const lowerCaseItemName = item.name.toLowerCase()

        // Obtener los tipos de mascota compatibles con el ítem
        const typepetCompatible = PETS_DATA.reduce((acc, pet) => {
            const isCompatible = Object.keys(pet.compatibility).some(key =>
                key.toLowerCase() === lowerCaseItemName
            )

            if (isCompatible) {
                acc.push(pet.type)
            }
            return acc
        }, [])

        // Filtrar las mascotas de Pets cuyo tipo sea compatible (ignora mayúsculas) y que esten vivas
        const lowerCaseTypes = typepetCompatible.map(type => type.toLowerCase())
        const filteredPets = Pets.filter(pet => {
            return lowerCaseTypes.includes(pet.type.toLowerCase()) && pet.live
        })
        return filteredPets
    }, [item?.name, Pets])

    useEffect(() => {
        const handleClick = (e) => {
            // Verificar si el clic fue dentro del ul o sus hijos
            if (ulRef.current && (ulRef.current === e.target || ulRef.current.contains(e.target))) {
                return; // No hacer nada si el clic fue dentro del ul
            }
            
            // Si el clic no fue en el ul, cerrar el menú
            setIsVisible(false);
        }

        if (isVisible) {
            document.addEventListener('click', handleClick)
        }
        
        return () => document.removeEventListener('click', handleClick)
    }, [isVisible])

    const handleUse = (e) => {
        e.stopPropagation(); // Evitar que el clic en el botón cierre inmediatamente el menú
        setIsVisible(!isVisible)
    }

    // verificar si el item.name es pocion sin tener en cuentas las mayusculas y minusculas
    useEffect(() => {
        setIsPocion(item.name.toLowerCase() === 'pocion')
        setIsVisible(false)
    }, [item.name])

    const handleConsume = (id) => {
        if (item.cant > 1) {
            consume(id, item)
            removeInventory(item.id, 1)
        } else {
            consume(id, item)
            removeInventory(item.id, 1)
            setFocus(null)
        }
    }

    const handleSell = () => {
        if (item.cant > 1) {
            addMoney(item.price * 0.75)
            removeInventory(item.id, 1)
        } else {
            addMoney(item.price * 0.75)
            removeInventory(item.id, 1)
            setFocus(null)
        }
    }

    return (
        <div className={styles.container} ref={containerRef}>
            <h2>{item.name} ({item.cant})</h2>
            <p>{item.description}</p>
            <button onClick={handleUse}>usar ({petCompatible.length})</button>
            {(isVisible && !isPocion) && (
                <div className={styles.overlay}>
                    <ul className={styles.list} ref={ulRef}>
                        {petCompatible.length > 0 ?
                            petCompatible.map(pet => (
                                <li key={pet.id}>
                                    <button onClick={() => handleConsume(pet.id)}>dar</button> a {pet.name}
                                </li>
                            ))
                            : <li>No compatibles</li>
                        }
                    </ul>
                </div>
            )}
            {(isVisible && isPocion) && (
                <div className={styles.overlay}>
                    <ul className={styles.list} ref={ulRef}>
                        {Pets.filter(pet => !pet.live).length > 0 ?
                            Pets.filter(pet => !pet.live).map(pet => (
                                <li key={pet.id}>
                                    <button onClick={() => handleConsume(pet.id)}>dar</button> a {pet.name}
                                </li>
                            ))
                            : <li>No compatibles</li>
                        }
                    </ul>
                </div>
            )}
            <button onClick={handleSell}>vender por {item.price * 0.75}</button>
        </div>
    )
}

export default ItemInventory