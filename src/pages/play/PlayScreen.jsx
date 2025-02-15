import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { PetsContext } from '../../contexts/PetsContext'
import GAME_METADATA from '../../data/gameMetadata.ts'


const PlayScreen = () => {
  const { game, petId } = useParams() // Obtener los parámetros de la URL
  const { Pets, play, reduceEnergy } = useContext(PetsContext) // Obtener el estado de las mascotas
  const [Component, setComponent] = useState(null) // Para almacenar el componente importado dinámicamente
  const [Start, setStart] = useState(false)
  const [finished, setFinished] = useState(false)
  const [energyCost, setEnergyCost] = useState(0)


  useEffect(() => {
    const loadComponent = async () => {
        try {
            // Cargar el componente dinámicamente
            const importedComponent = await import(`./games/${game}/${game}.jsx`);
            setComponent(() => importedComponent.default); // Asignar el componente

            // Cargar los metadatos del juego
            if (GAME_METADATA[game]) {
                setEnergyCost(GAME_METADATA[game].energy);
            } else {
                console.warn(`No hay metadatos para el juego: ${game}`);
            }
        } catch (error) {
            console.error('Error al cargar el componente:', error);
            setComponent(() => () => <div>Juego no encontrado</div>);
        }
    };

    loadComponent();
}, [game]);

useEffect(() => {
    if (Start) {
        reduceEnergy(petId, energyCost);
    }
}, [Start]);

useEffect(() => {
    if (finished) {
        play(petId, energyCost);
        window.location.href = `/pet/${petId}`;
    }
}, [finished]);

  // verificar que la mascota exista
  if (!Pets.find((pet) => pet.id === parseInt(petId))) {
    return <h1>Pet not found</h1>
  } 

  // verificar que la mascota este viva
  if (!Pets.find((pet) => pet.id === parseInt(petId)).live) {
    return <h1>Pet is dead</h1>
  }

  // verificar que la macota este despierta
  if (Pets.find((pet) => pet.id === parseInt(petId)).sleeping) {
    return <h1>Pet is sleeping</h1>
  }

  return (
    <div>
      {Component && <Component setFinished={setFinished} setStart={setStart} />}
    </div>
  )
}

export default PlayScreen