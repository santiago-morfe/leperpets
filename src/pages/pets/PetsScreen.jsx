import { useContext, useState } from "react"
import { PetsContext } from "../../contexts/PetsContext"
import FormNewPet from "./components/FormNewPet"
import ItemPet from "./components/ItemPet"

const PetsScreen = () => {
    const { Pets } = useContext(PetsContext)
    const [ isVisible, setIsVisible ] = useState(false)

    const handleAddPet = () => {
        setIsVisible(true)
    };


    return (
        <div>
            <h1>Mis mascotas</h1>
            <button onClick={handleAddPet}>Agregar mascota</button>
            {isVisible && <FormNewPet setIsVisible={setIsVisible} />}
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

export default PetsScreen