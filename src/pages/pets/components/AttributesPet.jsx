import { useState, useEffect } from 'react'
import CONFIG from '../../../data/config.ts'
const AttributesPet = ({ pet }) => {
    const [happiness, setHappiness] = useState(pet.happiness)
    const [energy, setEnergy] = useState(pet.energy)
    const [hunger, setHunger] = useState(pet.hunger)
    const [age, setAge] = useState(pet.age)

    useEffect(() => {
        setHappiness(pet.happiness)
        setEnergy(pet.energy)
        setHunger(pet.hunger)
        setAge(pet.age)
    }, [pet]);

    return (
        <div>
            <p>Edad: {age}</p>
            <p>Felicidad: </p>
            <progress value={happiness} max={CONFIG.maxHappiness}></progress>
            <p>Energía: </p>
            <progress value={energy} max={CONFIG.maxEnergy}></progress>
            <p>Hambre: </p>
            <progress value={hunger} max={CONFIG.maxHunger}></progress>
        </div>
    );
}

export default AttributesPet;
