import { Link } from "react-router-dom";
import { useContext } from "react";
import { PetsContext } from "../../contexts/PetsContext";

const PetsScreen = () => {
    const { Pets, addPets } = useContext(PetsContext);

    return (
        <div>
            <h1>Mis mascotas</h1>
            <ul>
                {Object.entries(Pets).map(([id, pet]) => (
                    <li key={id}>
                        <Link to={`/pet/${id}`}>{pet.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PetsScreen;