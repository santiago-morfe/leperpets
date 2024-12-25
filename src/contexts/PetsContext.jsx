import React, { createContext, useState, useEffect } from 'react';

export const PetsContext = createContext();

export const PetsProvider = ({ children }) => {

    // Cargar mascotas desde el localStorage
    const [Pets, setPets] = useState(() => {
        const storedData = localStorage.getItem('Pets');
        return storedData ? JSON.parse(storedData) : [];
    });

    // Guardar el estado en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('Pets', JSON.stringify(Pets));
    }, [Pets]);

    // rutina que disminulle la felicidad y hambre de las mascotas
    useEffect(() => {
        const interval = setInterval(() => {
            setPets((currentPets) =>
                currentPets.map((pet) => ({
                    ...pet,
                    happiness: Math.max(pet.happiness - 5, 0),
                    hunger: Math.max(pet.hunger - 5, 0),
                }))
            );
        }, 10 * 60000);
        return () => clearInterval(interval);
    }, []);

    // Funciones para interactuar con las mascotas

    // Agregar una mascota
    const addPets = (name, type) => {

        // Generar un nuevo id sumandole 1 al ultimo de la lista

        const newId =  Pets.length > 0 ? parseInt(Pets[Pets.length - 1].id) + 1 : 1

        // Crear un nuevo objeto pet
        const newPet = {
            id: newId,
            name,
            type,
            age: 0,
            hunger: 100,
            happiness: 100,
            energy: 100,
        };

        // Agregar la nueva mascota al estado
        setPets([...Pets, newPet]);
    }

    // eliminar una mascota
    const removePet = (id) => {
        const newPets = Pets.filter((pet) => pet.id !== id)
        setPets(newPets)
    };

    // jugar con mascota
    const play = (id) => {
        const newPets = Pets.map((pet) => {
            if (pet.id === id) {
                return {
                    ...pet,
                    happiness: pet.happiness + 10,
                    energy: pet.energy - 10,
                };
            }
            return pet;
        });
        setPets(newPets);
    };

    // alimentar a mascota
    const feed = (id) => {
        const newPets = Pets.map((pet) => {
            if (pet.id === id) {
                return {
                    ...pet,
                    hunger: pet.hunger + 10,
                    energy: pet.energy + 10,
                };
            }
            return pet;
        });
        setPets(newPets);
    };

    // descansar mascota
    const rest = (id) => {
        const newPets = Pets.map((pet) => {
            if (pet.id === id) {
                return {
                    ...pet,
                    energy: pet.energy + 10,
                    hunger: pet.hunger - 10,
                };
            }
            return pet;
        });
        setPets(newPets);
    };

    // renombra una mascota
    const rename = (id, name) => {
        const newPets = Pets.map((pet) => {
            if (pet.id === id) {
                return {
                    ...pet,
                    name,
                };
            }
            return pet;
        });
        setPets(newPets);
    };

    return (
        <PetsContext.Provider value={{ Pets, addPets, removePet, play, feed, rest, rename }}>
            {children}
        </PetsContext.Provider>
    );
};      
