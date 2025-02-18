import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PetsContext } from '../../../contexts/PetsContext'
import styles from './ItemPet.module.css'

const ItemPet = ({ pet }) => {
    const { age } = useContext(PetsContext)
    const [name] = useState(pet.name)
    const [happiness, setHappiness] = useState(pet.happiness)
    const [energy, setEnergy] = useState(pet.energy)
    const [hunger, setHunger] = useState(pet.hunger)
    const [state, setState] = useState('')


    useEffect(() => {
        if (pet.live) {
            if (pet.sleeping) {
                setState('Descansando')
            } else {
                setState('Despierto')
            }
        } else {
            setState('Muerto')
        }
        setHappiness(pet.happiness)
        setEnergy(pet.energy)
        setHunger(pet.hunger)
    }, [pet])

    return (
        <Link to={`/pet/${pet.id}`} className={styles.card}>
            <div className={styles.header} >
                <img
                    src="public/silueta_pet.png"
                    alt="" className={styles.image} />
                <div className={styles.info}>
                    <h2 className={styles.name}>{name}</h2>
                    <p className={`${styles.status} ${styles[`status${state}`]}`}>
                        {state}
                    </p>
                </div>
            </div>
            <div className={styles.statsContainer}>
                <div className={styles.statRow}>
                    <div className={styles.statLabel}>
                        <span>EDAD:</span>
                        <span>{age(pet.id)}</span>
                    </div>
                </div>
                <div className={`${styles.statRow} ${styles.happinessBar}`}>
                    <div className={styles.statLabel}>
                        <span>FELICIDAD</span>
                        <span>{happiness}%</span>
                    </div>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${happiness}%` }}
                        />
                    </div>
                </div>
                <div className={`${styles.statRow} ${styles.energyBar}`}>
                    <div className={styles.statLabel}>
                        <span>ENERGÍA</span>
                        <span>{energy}%</span>
                    </div>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${energy}%` }}
                        />
                    </div>
                </div>
                <div className={`${styles.statRow} ${styles.satietyBar}`}>
                    <div className={styles.statLabel}>
                        <span>SACIEDAD</span>
                        <span>{hunger}%</span>
                    </div>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${hunger}%` }}
                        />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ItemPet