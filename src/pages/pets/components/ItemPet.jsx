import { Link } from 'react-router-dom';
import AttributesPet from './AttributesPet';

const ItemPet = ({ pet }) => {
    return (
        <>
            <span>edad: {pet.age}</span>
            <AttributesPet pet={pet} />
            <Link to={`/pet/${pet.id}`}>{pet.name}</Link>
        </>
    );
}

export default ItemPet;