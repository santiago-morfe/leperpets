import React, { useState, useContext } from 'react'
import { PetsContext } from '../../../contexts/PetsContext'
import PETS_DATA from '../../../data/petsData.ts'


const FormNewPet = ({setIsVisible}) => {
    const { addPets } = useContext(PetsContext)
    const [name, setName] = useState('')
    const [type, setType] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // verificar que esten todos los datos
        if (!name || !type) {
            alert('Faltan datos')
            return
        }
        addPets(name, type)
        setIsVisible(false)
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setIsVisible(false)
    }

    return (
        <div>
            <h1>Nueva Mascota</h1>
            <form onSubmit={handleSubmit}>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Selecciona una mascota</option>
                    {PETS_DATA.map((pet) => (
                        <option key={pet.id} value={pet.type}>{pet.type}</option>
                    ))}
                </select>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                
                <button type="submit">Agregar</button>
                <button onClick={handleCancel}>Cancelar</button>
            </form>
        </div>
    );
}

export default FormNewPet