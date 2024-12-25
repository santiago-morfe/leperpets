import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { PetsContext } from "../../contexts/PetsContext"

const PetScreen = () => {
    const { Pets, addPets, feed, play, rest } = useContext(PetsContext)
    const { petId } = useParams()
    const [Pet, setPet] = useState({})

   

    useEffect(() => {
        // filtrar de la lista de objetos el que tenga el id que llega por parámetro
        const pet = Pets.find((pet) => pet.id === parseInt(petId))
        setPet(pet)
    }, [Pets, petId])

    if (!Pet) {
        return <div>No se encontró la mascota</div>
    }


    return (
        <div>
            <h1>{Pet.name}</h1>
            <button onClick={() => feed(petId)}>Alimentar</button>
            <button onClick={() => play(petId)}>Jugar</button>
            <button onClick={() => rest(petId)}>Descansar</button>
        </div>
    );

};

export default PetScreen
