// formulario para crear un nuevo pet

import React, { useState } from 'react'
import { usePets } from '../../../contexts/PetsContext'

const FormNewPet = () => {
    const { addPets } = usePets()
    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        addPets(name)
    }

    return (
        <div>
            <h1>Nueva Mascota</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
}

export default FormNewPet