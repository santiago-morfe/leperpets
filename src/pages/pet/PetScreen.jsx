import { useParams } from "react-router-dom"
import { useContext } from "react"
import { PetsContext } from "../../contexts/PetsContext"

const PetScreen = () => {
    const { Pets, addPets, feed, play, rest } = useContext(PetsContext)
    const { petId } = useParams()

    if (!Pets[petId]) {
        return <div>Mascota no encontrada</div>
    }

    return (
        <div>
            <h1>{Pets[petId].name}</h1>
        </div>
    );
};

export default PetScreen
