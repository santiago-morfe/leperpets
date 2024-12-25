import { useState, useEffect } from 'react';
const AttributesPet = ({ pet }) => {
    const [happiness, setHappiness] = useState(pet.happiness);
    const [energy, setEnergy] = useState(pet.energy);
    const [hunger, setHunger] = useState(pet.hunger);

    useEffect(() => {
        setHappiness(pet.happiness);
        setEnergy(pet.energy);
        setHunger(pet.hunger);
    }, [pet]);

    return (
        <div>
            <h3>Atributos</h3>
            <div>
                <div>
                    <span>Felicidad</span>
                    <progress value={happiness} max="100"></progress>
                </div>
                <div>
                    <span>Energía</span>
                    <progress value={energy} max="100"></progress>
                </div>
                <div>
                    <span>Hambre</span>
                    <progress value={hunger} max="100"></progress>
                </div>
            </div>
        </div>
    );
}

export default AttributesPet;
