import React, { createContext, useState, useEffect } from 'react';

export const PetsContext = createContext();

export const PetsProvider = ({ children }) => {

    // Cargar mascotas desde el localStorage
    const [Pets, setPets] = useState(() => {
        const storedData = localStorage.getItem('Pets');
        return storedData ? JSON.parse(storedData) : {};
    });

    // Guardar el estado en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('Pets', JSON.stringify(Pets));
    }, [Pets]);

    // Agregar una nueva mascota
    const addPets = (name, type) => {
        setPets((prev) => {
            // Obtener el último id (el id más alto)
            const lastId = Object.keys(prev.items).length
                ? Math.max(...Object.keys(prev.items).map(Number)) // Si hay mascotas, obtenemos el id máximo
                : 0; // Si no hay mascotas, comenzamos con el id 0
            const newId = lastId + 1; // Incrementar en 1 para el nuevo id
            // fecha de creación
            const createdAt = new Date().toISOString();
            return {
                ...prev,
                items: {
                    ...prev.items,
                    [newId]: { type, name, createdAt, hunger: 50, energy: 50, happiness: 50 },
                },
            };
        });
    };

    // Interacciones específicas por ID
    
    const feed = (id) => {
        setPets((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                hunger: Math.max(prev[id].hunger - 10, 0),
            },
        }));
    };

    const play = (id) => {
        setPets((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                happiness: Math.min(prev[id].happiness + 10, 100),
                energy: Math.max(prev[id].energy - 10, 0),
            },
        }));
    };

    const rest = (id) => {
        setPets((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                energy: Math.min(prev[id].energy + 20, 100),
            },
        }));
    };

    // edad de la mascota
    const age = (id) => {
        const now = new Date();
        const createdAt = new Date(Pets[id].createdAt);
        const diff = now - createdAt;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }


    return (
        <PetsContext.Provider value={{ Pets, addPets, feed, play, rest }}>
            {children}
        </PetsContext.Provider>
    );
};
