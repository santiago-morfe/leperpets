import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


const PlayScreen = () => {
  const { juego } = useParams()// Nombre del componente como texto
  const [Component, setComponent] = useState(null) // Para almacenar el componente importado dinámicamente

  useEffect(() => {
    const loadComponent = async () => {
      try {
        // Importar el componente dinámicamente basado en el texto
        const importedComponent = await import(`./components/${juego}`)
        setComponent(() => importedComponent.default); // Asignar el componente
      } catch (error) {
        console.error('Error al cargar el componente:', error)
        setComponent(() => () => <div>juego no encontrado</div>) // Mostrar error si no se encuentra
      }
    };

    loadComponent()
  }, [juego])

    return ( 
        <div>
          {Component && <Component />}
        </div>
    )
}

export default PlayScreen