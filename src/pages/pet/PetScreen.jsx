import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { PetsContext } from "../../contexts/PetsContext"
import gameMetadata from "../../data/gameMetadata.json"

const PetScreen = () => {
    const { Pets, feed, play, rest, age } = useContext(PetsContext)
    const { petId } = useParams()
    const [ Pet, setPet ] = useState(Pets.find((pet) => pet.id === parseInt(petId)))


    useEffect(() => {
        setPet(Pets.find((pet) => pet.id === parseInt(petId)))
    }, [Pets, petId])

    if (!Pet) {
        return <div>No se encontró la mascota</div>
    }


    return (
        <div>
            <h1>{Pet.name}</h1>
            <p>Edad: {age(petId)}</p>
            <p>Felicidad: </p>
            <progress value={Pet.happiness} max="100"></progress>
            <p>Energía: </p>
            <progress value={Pet.energy} max="100"></progress>
            <p>Hambre: </p>
            <progress value={Pet.hunger} max="100"></progress>
            <button onClick={() => feed(petId)}>Alimentar</button>
            <button onClick={() => play(petId)}>Jugar</button>
            <button onClick={() => rest(petId)}>Descansar</button>
            <div>
                <h2>juegos</h2>
                <ul>
                    {Object.keys(gameMetadata).map((game, index) => (
                        <li key={index}>
                            <a href={`/play/${petId}/${game}`}>{game}</a>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );

};

export default PetScreen
