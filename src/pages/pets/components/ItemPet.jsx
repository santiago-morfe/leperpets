import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import AttributesPet from './AttributesPet';
import { PetsContext } from '../../../contexts/PetsContext';

const ItemPet = ({ pet }) => {
    const [showOptions, setShowOptions] = useState(false);
    const { removePet, play, feed, rest } = useContext(PetsContext);

    const handleOptions = () => {
        setShowOptions(!showOptions);
    }



    return (
        <>
            <button onClick={handleOptions}>...</button>
            {showOptions && (
                <div>
                    <button onClick={() => play(pet.id)}>Jugar</button>
                    <button onClick={() => feed(pet.id)}>Alimentar</button>
                    <button onClick={() => rest(pet.id)}>Descansar</button>
                    <button onClick={() => removePet(pet.id)}>Eliminar</button>
                </div>
            )}
            <span>edad: {pet.age}</span>
            <AttributesPet pet={pet} />
            <Link to={`/pet/${pet.id}`}>{pet.name}</Link>
        </>
    );
}

export default ItemPet;