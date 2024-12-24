import { Link } from 'react-router-dom';
import AttributesPet from './AttributesPet';

const ItemPet = ({ pet }) => {
    return (
        <li>
            <spam>edad: {pet.age}</spam>
            <AttributesPet pet={pet} />
            <Link to={`/pet/${pet.id}`}>{pet.name}</Link>
        </li>
    );
}

export default ItemPet;