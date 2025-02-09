import React, { createContext, useState, useEffect } from 'react'
import CONFIG from '../data/config.ts'
import PETS_DATA from '../data/petsData.ts'

export const PetsContext = createContext()

export const PetsProvider = ({ children }) => {

    // Cargar mascotas desde el localStorage
    const [Pets, setPets] = useState(() => {
        const storedData = localStorage.getItem('Pets')
        return storedData ? JSON.parse(storedData) : []
    });

    // Guardar el estado en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('Pets', JSON.stringify(Pets))
    }, [Pets]);

    // rutina que disminulle la felicidad y hambre de las mascotas
    useEffect(() => {
        const interval = setInterval(() => {
            setPets((currentPets) => {
                return currentPets.map((pet) => {
                    if (pet.live === false) {

                        return pet

                    } else if (pet.sleeping) {

                        if (pet.hunger == 0 || pet.energy == CONFIG.maxEnergy) {

                            return {
                                ...pet,
                                sleeping: false
                            }

                        } else {

                            return {
                                ...pet,
                                energy: Math.min(pet.energy + CONFIG.converValueSleeping, CONFIG.maxEnergy) || 0,
                                hunger: Math.max(pet.hunger - CONFIG.converValueSleeping, 0) || 0,
                            }

                        }

                    } else if (pet.hunger > 0 || pet.happiness > 0) {

                        return {
                            ...pet,
                            happiness: Math.max(pet.happiness - CONFIG.decreaseHappiness, 0) || 0,
                            hunger: Math.max(pet.hunger - CONFIG.decreaseHunger, 0) || 0,
                        }

                    } else if (pet.energy > 0) {

                        return {
                            ...pet,
                            energy: Math.max(pet.energy - CONFIG.decreaseEnergy, 0) || 0,
                        }

                    } else {

                        return {
                            ...pet,
                            live: false,
                        }

                    }
                })
            })
        }, CONFIG.interval * 1000)
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
            happiness: CONFIG.initialHappiness,
            hunger: CONFIG.initialHunger,
            energy: CONFIG.initialEnergy,
            live: true,
            sleeping: false
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
                    happiness: Math.min(pet.happiness + parseInt(value), CONFIG.maxHappiness) || 0,
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
                    energy: Math.max(pet.energy - value, 0) || 0
                };
            }
            return pet;
        });
        setPets(newPets);
    };

    // alimentar a mascota
    const feed = (id) => {
        const newPets = Pets.map((pet) => {
            if ((pet.id === parseInt(id)) && (pet.hunger < CONFIG.maxHunger)) {
                return {
                    ...pet,
                    hunger: Math.min(pet.hunger + 10, CONFIG.maxHunger) || 0,
                    energy: Math.min(pet.energy + 5, CONFIG.maxEnergy) || 0,
                };
            }
            return pet;
        });
        setPets(newPets);
    };

    // descansar mascota
    const rest = (id) => {
        const newPets = Pets.map((pet) => {
            if ((pet.id === parseInt(id)) && (pet.energy < CONFIG.maxEnergy) && (pet.hunger > 0)) {
                return {
                    ...pet,
                    energy: Math.min(pet.energy + 10, CONFIG.maxEnergy) || 0,
                    hunger: Math.max(pet.hunger - 10, 0) || 0,
                    happiness: Math.min(pet.happiness + 5, CONFIG.maxHappiness) || 0,
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
            if (item.name.toLowerCase() === 'pocion') {
                return {
                    ...pet,
                    live: true,
                    happiness: Math.min(pet.happiness + (CONFIG.maxHappiness/2), CONFIG.maxHappiness) || 0,
                    hunger: Math.min(pet.hunger + (CONFIG.maxHunger/2), CONFIG.maxHunger) || 0,
                    energy: Math.min(pet.energy + (CONFIG.maxEnergy/2), CONFIG.maxEnergy) || 0,
                };
            }
            if ((pet.id == parseInt(id)) && (pet.live) && (pet.sleeping == false)) {
                const petData = PETS_DATA.find((petData) => petData.type === pet.type)
                const key = Object.keys(petData.compatibility).find(k => k.toLowerCase() === item.name.toLowerCase());
                const multiplier = key ? petData.compatibility[key] : 0;
                const value = item.baseValue * multiplier
                return {
                    ...pet,
                    hunger: Math.min(pet.hunger + value, CONFIG.maxHunger) || 0,
                };
            }
            return pet;
        })
        setPets(newPets)
    }

    // funcion para dormir a la mascota
    const sleep = (id) => {
        const newPets = Pets.map((pet) => {
            if (pet.id == parseInt(id)) {
                return {
                    ...pet,
                    sleeping: true
                };
            }
            return pet;
        })
        setPets(newPets);
    }

    // funcion para despertar a la mascota
    const wakeUp = (id) => {
        const newPets = Pets.map((pet) => {
            if (pet.id == parseInt(id)) {
                return {
                    ...pet,
                    sleeping: false
                };
            }
            return pet;
        })
        setPets(newPets);
    }

    return (
        <PetsContext.Provider value={{ Pets, addPets, removePet, play, feed, rest, rename, age, consume, reduceEnergy, sleep, wakeUp }}>
            {children}
        </PetsContext.Provider>
    );
};      
