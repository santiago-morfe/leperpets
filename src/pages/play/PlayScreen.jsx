import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { PetsContext } from '../../contexts/PetsContext'
import { WalletContext } from '../../contexts/WalletContext'
import CONFIG from '../../data/config.ts'
import GAME_METADATA from '../../data/gameMetadata.ts'

const PlayScreen = () => {
  const { game, petId } = useParams() // Obtener los parámetros de la URL
  const { Pets, play, reduceEnergy } = useContext(PetsContext) // Obtener el estado de las mascotas
  const { addMoney } = useContext(WalletContext) // Obtener el estado de la billetera
  const [Component, setComponent] = useState(null) // Para almacenar el componente importado dinámicamente
  const [start, setStart] = useState(false)
  const [finished, setFinished] = useState(false)
  const [energyCost, setEnergyCost] = useState(0)
  const [reward, setReward] = useState(0)

  const pet = Pets.find((pet) => pet.id === parseInt(petId))

  const validatePet = () => {
    if (!pet) {
      return <h1>Pet not found</h1>
    }
    if (!pet.live) {
      return <h1>Pet is dead</h1>
    }
    if (pet.sleeping) {
      return <h1>Pet is sleeping</h1>
    }
    return null
  }

  // opcion para rendirce y salier del juego
  const handleSurrender = () => {
    window.location.href = `/pet/${petId}`
  }

  useEffect(() => {
    const loadComponent = async () => {
      try {
        // Cargar el componente dinámicamente
        const importedComponent = await import(`./games/${game}/${game}.jsx`)
        setComponent(() => importedComponent.default) // Asignar el componente

        // Cargar los metadatos del juego
        if (GAME_METADATA[game]) {
          setEnergyCost(GAME_METADATA[game].energyCost)
        } else {
          console.warn(`No hay metadatos para el juego: ${game}`)
        }
      } catch (error) {
        console.error('Error al cargar el componente:', error)
        setComponent(() => () => <div>Juego no encontrado</div>)
      }
    }

    loadComponent()
  }, [game])

  useEffect(() => {
    if (start) {
      reduceEnergy(petId, energyCost)
    }
  }, [start])

  useEffect(() => {
    if (finished) {
      play(petId, (CONFIG.energyToHappinessRate * energyCost) )
      // redondear la recompensa a 2 decimales
      let newReward = Math.round(reward * 100) / 100
      addMoney(petId, newReward)
      alert(newReward)
      window.location.href = `/pet/${petId}`
    }
  }, [finished])

  const validationMessage = validatePet()
  if (validationMessage) {
    return validationMessage
  }

  return (
    <div>
      {Component && <Component setFinished={setFinished} setStart={setStart} setReward={setReward} handleSurrender={handleSurrender} />}
    </div>
  )
}

export default PlayScreen