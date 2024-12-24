import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


const PlayScreen = () => {
  const { game, petId } = useParams() // Obtener los parámetros de la URL
  const [Component, setComponent] = useState(null) // Para almacenar el componente importado dinámicamente

  useEffect(() => {
    const loadComponent = async () => {
      try {
        // Importar el componente dinámicamente basado en el texto
        const importedComponent = await import(`./games/${game}.jsx`)
        setComponent(() => importedComponent.default); // Asignar el componente
      } catch (error) {
        console.error('Error al cargar el componente:', error)
        setComponent(() => () => <div>juego no encontrado</div>) // Mostrar error si no se encuentra
      }
    };

    loadComponent()
  }, [game])

    return ( 
        <div>
          {Component && <Component />}
        </div>
    )
}

export default PlayScreen