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
        }, 5 * 60000);
        return () => clearInterval(interval);
    }, []);

    // Funciones para interactuar con las mascotas

    // Agregar una mascota
    const addPets = (name, type) => {

        // Generar un nuevo id sumandole 1 al ultimo de la lista

        const newId = Pets.length > 0 ? parseInt(Pets[Pets.length - 1].id) + 1 : 1

        // Crear un nuevo objeto pet
        const newPet = {
            id: newId,
            name,
            type,
            createdAt: new Date(),
            happiness: 100,
            hunger: 100,
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
            if ((pet.id === parseInt(id)) && (pet.energy > 0)) {
                return {
                    ...pet,
                    happiness: Math.min(pet.happiness + 10, 100),
                    energy: Math.max(pet.energy - 10, 0),
                };
            }
            return pet;
        });
        setPets(newPets);
    };

    // alimentar a mascota
    const feed = (id) => {
        const newPets = Pets.map((pet) => {
            if ((pet.id === parseInt(id)) && (pet.hunger < 100)) {
                return {
                    ...pet,
                    hunger: Math.min(pet.hunger + 10, 100),
                    energy: Math.min(pet.energy + 5, 100),
                };
            }
            return pet;
        });
        setPets(newPets);
    };

    // descansar mascota
    const rest = (id) => {
        const newPets = Pets.map((pet) => {
            if ((pet.id === parseInt(id)) && (pet.energy < 100) && (pet.hunger > 0)) {
                return {
                    ...pet,
                    energy: Math.min(pet.energy + 10, 100),
                    hunger: Math.max(pet.hunger - 10, 0),
                    happiness: Math.min(pet.happiness + 5, 100),
                };
            }
            return pet;
        });
        setPets(newPets);
    };

    // renombra una mascota
    const rename = (id, name) => {
        const newPets = Pets.map((pet) => {
            if (pet.id === parseInt(id)) {
                return {
                    ...pet,
                    name,
                };
            }
            return pet;
        });
        setPets(newPets);
    };

    // edad de la mascota en base a la fecha de creación
    const age = (id) => {
        const now = new Date();
        const pet = Pets.find((pet) => pet.id === parseInt(id));
        const diff = now - new Date(pet.createdAt);
        // retornan minutos si es menos de una hora oras si es menos de un dia y dias si es mas de un dia y menos de un mes y meses si es mas de un mes
        if (diff < 60000) return Math.floor(diff / 1000) + ' segundos';
        if (diff < 3600000) return Math.floor(diff / 60000) + ' minutos';
        if (diff < 86400000) return Math.floor(diff / 3600000) + ' horas';
        if (diff < 2592000000) return Math.floor(diff / 86400000) + ' días';
        if (diff < 31536000000) return Math.floor(diff / 2592000000) + ' meses';
    };

    // funcion para consumir items consumibles
    const consume = (id, item) => {
        const newPets = Pets.map((pet) => {
            if (pet.id === parseInt(id)) {
                return {
                    ...pet,
                    // comprobar si es negativo o positivo
                    happiness: Math.min(Math.max(pet.happiness + item.happiness, 0), 100),
                    energy: Math.min(Math.max(pet.energy + item.energy, 0), 100),
                    hunger: Math.min(Math.max(pet.hunger + item.hunger, 0), 100),
                    // cambiar el estado de vivo o no vivo si live es diferente a null
                    live: item.live !== null ? item.live : pet.live,
                };
            }
            return pet;
        });
        setPets(newPets);
    };

    return (
        <PetsContext.Provider value={{ Pets, addPets, removePet, play, feed, rest, rename, age, consume }}>
            {children}
        </PetsContext.Provider>
    );
};      
