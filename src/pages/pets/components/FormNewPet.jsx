// formulario para crear un nuevo pet

import React, { useState, useContext } from 'react'
import { PetsContext } from '../../../contexts/PetsContext'

const FormNewPet = ({setIsVisible}) => {
    const { addPets } = useContext(PetsContext)
    const [name, setName] = useState('')
    const [type, setType] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
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
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="dog">Perro</option>
                    <option value="cat">Gato</option>
                    <option value="fish">Pez</option>
                </select>
                <button type="submit">Agregar</button>
                <button onClick={handleCancel}>Cancelar</button>
            </form>
        </div>
    );
}

export default FormNewPet