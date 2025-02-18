import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import AttributesPet from './AttributesPet';
import { PetsContext } from '../../../contexts/PetsContext';

const ItemPet = ({ pet }) => {
    const [showOptions, setShowOptions] = useState(false);
    const { removePet, play, feed, rest, age, sleep, wakeUp } = useContext(PetsContext);

    if (!pet.live) {
        return (

            <Link to={`/pet/${pet.id}`}>
                <h2>{pet.name}</h2>
                <span>muerto</span>
            </Link>
        )
    }

    return (
        <Link to={`/pet/${pet.id}`}>
            <h2>{pet.name}</h2>
            <p>edad: {age(pet.id)}</p>
            {pet.sleeping ? <span> Descansando</span> : <span> Despierto</span>}
            <AttributesPet pet={pet} />
        </Link>
    )
}

export default ItemPet;