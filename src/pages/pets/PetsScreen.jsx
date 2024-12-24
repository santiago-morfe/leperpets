import { useContext } from "react";
import { PetsContext } from "../../contexts/PetsContext";
import ItemPet from "./components/ItemPet";

const PetsScreen = () => {
    const { Pets, addPets } = useContext(PetsContext);

    return (
        <div>
            <h1>Mis mascotas</h1>
            <ul>
                {Object.entries(Pets).map(([id, pet]) => (
                    <li key={id}>
                        <ItemPet pet={pet} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PetsScreen;