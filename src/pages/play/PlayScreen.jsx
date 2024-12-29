import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { PetsContext } from '../../contexts/PetsContext'


const PlayScreen = () => {
  const { game, petId } = useParams() // Obtener los parámetros de la URL
  const [Component, setComponent] = useState(null) // Para almacenar el componente importado dinámicamente
  const [play, setPlay] = useState(false) // Para almacenar la función de play
  const { Pets } = useContext(PetsContext) // Obtener el estado de las mascotas


  useEffect(() => {
    const loadComponent = async () => {
      try {
        const importedComponent = await import(`./games/${game}/${game}.jsx`) // Importar el componente dinámicamente basado en el texto
        setComponent(() => importedComponent.default); // Asignar el componente
      } catch (error) {
        console.error('Error al cargar el componente:', error)
        setComponent(() => () => <div>juego no encontrado</div>) // Mostrar error si no se encuentra
      }
    };

    loadComponent()
  }, [game])

  // verificar que la mascota exista
  if (!Pets.find((pet) => pet.id === parseInt(petId))) {
    return <h1>Pet not found</h1>
  }

  return (
    <div>
      {Component && <Component />}
    </div>
  )
}

export default PlayScreen