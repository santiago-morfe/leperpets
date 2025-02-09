import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { PetsContext } from '../../contexts/PetsContext'
import NavComponent from '../../components/NavComponent'
import FootList from './components/FootList.jsx'
import CONFIG from '../../data/config.ts'


const PetScreen = () => {
  const { petId } = useParams()

  // Contexto de mascotas
  const { Pets, feed, play, rest, age, consume } = useContext(PetsContext)
  const [selectedPet, setSelectedPet] = useState(null)

  // Actualizar la mascota seleccionada si cambian los datos del contexto o el petId
  useEffect(() => {
    setSelectedPet(Pets.find((pet) => pet.id == petId))
  }, [Pets, petId])

  if (!selectedPet) return <div>No se encontró la mascota</div>

  return (
    <div>
      <NavComponent />
      <h1>{selectedPet.name}</h1>
      <p>{selectedPet.type}</p>
      <p>Edad: {age(petId)}</p>
      <p>
        Felicidad:
        <progress value={selectedPet.happiness} max={CONFIG.maxHappiness}></progress>
      </p>
      <p>
        Energía:
        <progress value={selectedPet.energy} max={CONFIG.maxEnergy}></progress>
      </p>
      <p>
        Hambre:
        <progress value={selectedPet.hunger} max={CONFIG.maxHunger}></progress>
      </p>
      <FootList petId={petId} />
    </div>
  )
}

export default PetScreen
