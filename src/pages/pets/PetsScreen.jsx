import { useContext, useState } from "react"
import { PetsContext } from "../../contexts/PetsContext"
import FormNewPet from "./components/FormNewPet"
import ItemPet from "./components/ItemPet"
import NavComponent from "../../components/NavComponent"

const PetsScreen = () => {
    const { Pets } = useContext(PetsContext)
    const [ isVisible, setIsVisible ] = useState(false)

    const handleAddPet = () => {
        setIsVisible(true)
    }

    if (!Pets) {
        return <div>No se encontraron mascotas</div>
    }

    return (
        <>
            <NavComponent />
            <h1>Mis mascotas</h1>
            <button onClick={handleAddPet}>adoptar</button>
            {isVisible && <FormNewPet setIsVisible={setIsVisible} />}
            <ul>
                {Pets.map((pet) => (
                    <li key={pet.id}>
                        <ItemPet pet={pet} />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default PetsScreen