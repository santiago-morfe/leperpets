import { createContext, useState, useEffect } from 'react';

export const InventoriContext = createContext();

export const InventoriProvider = ({ children }) => {
    const [Inventori, setInventori] = useState(JSON.parse(localStorage.getItem('inventori')) || {});

    useEffect(() => {
        localStorage.setItem('inventori', JSON.stringify(Inventori));
    }, [Inventori]);

    // agregar item al inventario 
    const addInventori = (item, cant) => {
        // ver si un itm con ese id ya existe
        const itemIndex = Inventori.findIndex((i) => i.id === item.id);
        // si ya lo hay agregar l cantidad
        if (itemIndex !== -1) {
            const newInventori = [...Inventori];
            newInventori[itemIndex].cant += cant;
            setInventori(newInventori);
        } else {
            // si no existe agregar el item
            setInventori([...Inventori, { ...item, cant }]);
        }
    }

    // eliminar items del inventario
    const removeItem = (id, cant) => {
        const itemIndex = Inventori.findIndex((i) => i.id === id);
        if (itemIndex !== -1) {
            const newInventori = [...Inventori];
            // comprorbar si la cantidad a eliminar es mayor a la cantidad en inventario
            if (newInventori[itemIndex].cant > cant) {
                newInventori[itemIndex].cant -= cant;
            } else if (newInventori[itemIndex].cant === cant) {
                // si la cantidad es igual a la cantidad en inventario eliminar el item
                newInventori.splice(itemIndex, 1);
            } else {
                // si la cantidad a eliminar es mayor a la cantidad en inventario
                return;
            }
            setInventori(newInventori);
        } else {
            return;
        }
    }

    return (
        <InventoriContext.Provider value={{ Inventori, addInventori, removeItem }}>
            {children}
        </InventoriContext.Provider>
    );
}

