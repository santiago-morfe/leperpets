import { useContext, useState, useRef, useEffect } from "react";
import { PetsContext } from "../../contexts/PetsContext";
import FormNewPet from "./components/FormNewPet";
import ItemPet from "./components/ItemPet";
import NavComponent from "../../components/NavComponent";
import styles from "./PetsScreen.module.css";

const PetsScreen = () => {
    const { Pets } = useContext(PetsContext);
    const [isVisible, setIsVisible] = useState(false);
    const inputRef = useRef(null);

    const handleAddPet = () => {
        setIsVisible(true);
    };

    const handleClick = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    if (!Pets) {
        return (
            <div className={styles.container}>
                <NavComponent />
                <div className={styles.emptyState}>
                    No se encontraron mascotas
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <NavComponent />
            <h1 className={styles.title}>Mis mascotas</h1>
            <button 
                className={styles.addButton}
                onClick={(e) => {
                    e.stopPropagation();
                    handleAddPet();
                }}
            >
                Agregar mascota
            </button>
            {isVisible && (
                <div ref={inputRef}>
                    <FormNewPet setIsVisible={setIsVisible} />
                </div>
            )}
            <ul className={styles.petsList}>
                {Pets.map((pet) => (
                    <li key={pet.id} className={styles.petsListItem}>
                        <ItemPet pet={pet} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PetsScreen;