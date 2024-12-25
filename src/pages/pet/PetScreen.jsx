import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { PetsContext } from "../../contexts/PetsContext"

const PetScreen = () => {
    const { Pets, feed, play, rest, age } = useContext(PetsContext)
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
            <p>Edad: {age(Pet)}</p>
            <p>Hambre: </p>
            <progress value={Pet.hunger} max="100"></progress>
            <p>Energía: </p>
            <progress value={Pet.energy} max="100"></progress>
            <p>Felicidad: </p>
            <progress value={Pet.happiness} max="100"></progress>
            <button onClick={() => feed(petId)}>Alimentar</button>
            <button onClick={() => play(petId)}>Jugar</button>
            <button onClick={() => rest(petId)}>Descansar</button>
        </div>
    );

};

export default PetScreen
