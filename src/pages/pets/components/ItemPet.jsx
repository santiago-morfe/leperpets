import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import AttributesPet from './AttributesPet';
import { PetsContext } from '../../../contexts/PetsContext';

const ItemPet = ({ pet }) => {
    const [showOptions, setShowOptions] = useState(false);
    const { removePet, play, feed, rest, age } = useContext(PetsContext);

    const handleOptions = () => {
        setShowOptions(!showOptions);
    }

    if (!pet.live) {
        return (
            <div>
                <h1>{pet.name}</h1>
                <span>edad: {age(pet.id)}</span>
                <span>Estado: Muerto</span>
                <button onClick={() => removePet(pet.id)}>Eliminar</button>
            </div>
        )
    }

    return (
        <>
            <Link to={`/pet/${pet.id}`}>
                <h1>{pet.name}</h1>
            </Link>
            <button onClick={handleOptions}>...</button>
            {showOptions && (
                <div>
                    <button onClick={() => play(pet.id, 5)}>Jugar</button>
                    <button onClick={() => feed(pet.id)}>Alimentar</button>
                    <button onClick={() => rest(pet.id)}>Descansar</button>
                    <button onClick={() => removePet(pet.id)}>Eliminar</button>
                </div>
            )}
            <span>edad: {age(pet.id)}</span>
            <AttributesPet pet={pet} />
        </>
    );
}

export default ItemPet;