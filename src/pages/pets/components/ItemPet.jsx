import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import AttributesPet from './AttributesPet';
import { PetsContext } from '../../../contexts/PetsContext';

const ItemPet = ({ pet }) => {
    const [showOptions, setShowOptions] = useState(false);
    const { removePet, play, feed, rest, age,  sleep, wakeUp } = useContext(PetsContext);

    if (!pet.live) {
        return (
            <div>
                <Link to={`/pet/${pet.id}`}>
                <h1>{pet.name}</h1>
                </Link>
                <span>Estado: Muerto</span>
            </div>
        )
    }

    return (
        <>
            <Link to={`/pet/${pet.id}`}>
                <h2>{pet.name}</h2>
            </Link>
            <span>edad: {age(pet.id)}</span>
            {pet.sleeping ? <span>estado: Descansando</span> : <span> estado: Despierto</span>}  
            <AttributesPet pet={pet} />
        </>
    )
}

export default ItemPet;