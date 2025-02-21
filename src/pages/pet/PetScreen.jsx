import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PetsContext } from '../../contexts/PetsContext'
import NavComponent from '../../components/NavComponent'
import FootList from './components/FootList.jsx'
import GamesList from './components/GamesList.jsx'
import CONFIG from '../../data/config.ts'
import styles from './PetScreen.module.css'

const PetScreen = () => {
  const { petId } = useParams()
  const { Pets, age, sleep, wakeUp } = useContext(PetsContext)
  const [selectedPet, setSelectedPet] = useState(null)

  useEffect(() => {
    setSelectedPet(Pets.find((pet) => pet.id == petId))
  }, [Pets, petId])

  if (!selectedPet) return <div>No se encontró la mascota</div>

  const { name, type, live, sleeping, happiness, energy, hunger } = selectedPet

  return (
    <div className={styles.container}>
      <NavComponent />
      <header className={styles.header}>
        <div className={styles.petInfo}>
          <h1 className={styles.title}>{name}</h1>
          <img src='/silueta_pet.png' alt='' className={styles.image} />
          <p className=  {styles.type}>{type}</p>
        </div>

        <div className={styles.petStats}>
          <p>Edad: {age(petId)}</p>
          <p>Estado: {live ? (sleeping ? 'Descansando' : 'Despierto') : 'Muerto'}</p>

          <StatusBar label="Felicidad" value={happiness} max={CONFIG.maxHappiness} />
          <StatusBar label="Energía" value={energy} max={CONFIG.maxEnergy} />
          <StatusBar label="Hambre" value={hunger} max={CONFIG.maxHunger} />
        </div>
      </header>

      <main className={styles.main}>
        {live && (
          <>
            <section className={styles.actions}>
              <div>
                {sleeping ? (
                  <button onClick={() => wakeUp(petId)}>Despertar</button>
                ) : (
                  <button onClick={() => sleep(petId)}>Dormir</button>
                )}
              </div>
              {live && !sleeping && (
                <>
                  <FootList />
                  <GamesList />
                </>
              )}
            </section>
            <section className={styles.info}>
              <p>informacion</p>
              <p>alimentos compatibles</p>
              <p>historia</p>
            </section>
          </>
        )}
        {!live && <FootList />}
      </main>
    </div>
  )
}

const StatusBar = ({ label, value, max }) => (
  <div>
    <div>
      <span>{label}</span>
      <span>{Math.round((value / max) * 100)}%</span>
    </div>
    <div>
      <div style={{ width: `${(value / max) * 100}%` }}></div>
    </div>
  </div>
)

export default PetScreen
