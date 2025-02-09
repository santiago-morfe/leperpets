import { useState, useEffect } from 'react'

const useJsonData = (url) => {
  const [data, setData] = useState(null)      // Aquí se almacenarán los datos del JSON
  const [loading, setLoading] = useState(true)  // Estado para el loading
  const [error, setError] = useState(null)      // Estado para errores

  useEffect(() => {
    // Función asíncrona para obtener los datos
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Error al cargar el archivo JSON')
        }
        const jsonData = await response.json()
        setData(jsonData)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

export default useJsonData
