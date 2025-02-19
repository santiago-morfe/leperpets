import React, { useState, useContext } from 'react';
import { PetsContext } from '../../../contexts/PetsContext';
import PETS_DATA from '../../../data/petsData.ts';
import styles from './FormNewPet.module.css';

const FormNewPet = ({ setIsVisible }) => {
    const { addPets } = useContext(PetsContext);
    const [name, setName] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !type) {
            alert('Faltan datos');
            return;
        }
        addPets(name, type);
        setIsVisible(false);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setIsVisible(false);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <h2 className={styles.title}>Nueva Mascota</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <select 
                        className={styles.select}
                        value={type} 
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">Selecciona una mascota</option>
                        {PETS_DATA.map((pet) => (
                            <option key={pet.id} value={pet.type}>
                                {pet.type}
                            </option>
                        ))}
                    </select>
                    <input 
                        type="text"
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre de tu mascota"
                    />
                    <div className={styles.buttonContainer}>
                        <button 
                            type="submit"
                            className={`${styles.button} ${styles.buttonSubmit}`}
                        >
                            Agregar
                        </button>
                        <button 
                            onClick={handleCancel}
                            className={`${styles.button} ${styles.buttonCancel}`}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormNewPet;