import React, { createContext, useState, useEffect } from 'react'
import { config } from '../data/config.json'

export const PetsContext = createContext()

export const PetsProvider = ({ children }) => {

    // Cargar mascotas desde el localStorage
    const [Pets, setPets] = useState(() => {
        const storedData = localStorage.getItem('Pets')
        return storedData ? JSON.parse(storedData) : []
    });

    // cargar la configuracion de los pets
    const [ Config ] = useState(config)

    // Guardar el estado en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('Pets', JSON.stringify(Pets))
    }, [Pets]);

    // rutina que disminulle la felicidad y hambre de las mascotas
    useEffect(() => {
        const interval = setInterval(() => {
            setPets((currentPets) =>{
                return currentPets.map((pet) => {
                    if (pet.hunger > 0 || pet.happiness > 0) {
                        return {
                            ...pet,
                            happiness: Math.max(pet.happiness - Config.decreaseHappiness, 0),
                            hunger: Math.max(pet.hunger - Config.decreaseHunger, 0),
                        }
                    } else if ( pet.energy > 0 ){
                        return {
                            ...pet,
                            energy: Math.max(pet.energy - Config.decreaseEnergy, 0),
                        }
                    } else {
                        return {
                            ...pet,
                            live: false,
                        }
                    }
                })
            })
        }, Config.interval * 60000)
        return () => clearInterval(interval)
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
            happiness: Config.initialHappiness,
            hunger: Config.initialHunger,
            energy: Config.initialEnergy,
            live: true,
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
    const play = (id, value) => {
        const newPets = Pets.map((pet) => {
            if ((pet.id === parseInt(id)) && (pet.energy > 0)) {
                return {
                    ...pet,
                        happiness: Math.min(pet.happiness +  parseInt(value), Config.maxHappiness),
                };
            }
            return pet;
        });
        setPets(newPets);
    };

    // funcion para vajar la energia de la mascota
    const reduceEnergy = (id, value) => {
        const newPets = Pets.map((pet) => {
            if (pet.id === parseInt(id)) {
                return {
                    ...pet,
                    energy: Math.max(pet.energy - value, 0)
                };
            }
            return pet;
        });
        setPets(newPets);
    };

    // alimentar a mascota
    const feed = (id) => {
        const newPets = Pets.map((pet) => {
            if ((pet.id === parseInt(id)) && (pet.hunger < Config.maxHunger)) {
                return {
                    ...pet,
                    hunger: Math.min(pet.hunger + 10, Config.maxHunger),
                    energy: Math.min(pet.energy + 5, Config.maxEnergy),
                };
            }
            return pet;
        });
        setPets(newPets);
    };

    // descansar mascota
    const rest = (id) => {
        const newPets = Pets.map((pet) => {
            if ((pet.id === parseInt(id)) && (pet.energy < Config.maxEnergy ) && (pet.hunger > 0)) {
                return {
                    ...pet,
                    energy: Math.min(pet.energy + 10, Config.maxEnergy),
                    hunger: Math.max(pet.hunger - 10, 0),
                    happiness: Math.min(pet.happiness + 5, Config.maxHappiness),
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
        if (diff < 60000) return Math.floor(diff / 1000) + ' segundos'
        if (diff < 3600000) return Math.floor(diff / 60000) + ' minutos'
        if (diff < 86400000) return Math.floor(diff / 3600000) + ' horas'
        if (diff < 2592000000) return Math.floor(diff / 86400000) + ' días'
        if (diff < 31536000000) return Math.floor(diff / 2592000000) + ' meses'
    };

    // funcion para consumir items consumibles
    const consume = (id, item) => {
        const newPets = Pets.map((pet) => {
            if (pet.id === parseInt(id)) {
                return {
                    ...pet,
                    // comprobar si es negativo o positivo
                    happiness: Math.min(Math.max(pet.happiness + item.happiness, 0), Config.maxHappiness),
                    energy: Math.min(Math.max(pet.energy + item.energy, 0), Config.maxEnergy),
                    hunger: Math.min(Math.max(pet.hunger + item.hunger, 0), Config.maxHunger),
                    // cambiar el estado de vivo o no vivo si live es diferente a null
                    live: item.live !== null ? item.live : pet.live,
                };
            }
            return pet
        });
        setPets(newPets)
    };

    return (
        <PetsContext.Provider value={{ Pets, addPets, removePet, play, feed, rest, rename, age, consume, reduceEnergy }}>
            {children}
        </PetsContext.Provider>
    );
};      
