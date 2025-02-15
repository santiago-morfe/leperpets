import { createContext, useState, useEffect } from 'react';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    const [Inventory, setInventory] = useState(JSON.parse(localStorage.getItem('inventory')) || []);

    useEffect(() => {
        localStorage.setItem('inventory', JSON.stringify(Inventory));
    }, [Inventory]);

    // agregar item al inventario 
    const addInventory = (item, cant) => {
        setInventory((prevInventory) => {
            const newInventory = prevInventory.map((i) =>
                i.id === item.id ? { ...i, cant: i.cant + cant } : i
            );
    
            if (!newInventory.some((i) => i.id === item.id)) {
                newInventory.push({ ...item, cant });
            }
    
            return newInventory;
        });
    }

    // eliminar items del inventario
    const removeInventory = (id, cant) => {
        const itemIndex = Inventory.findIndex((i) => i.id === id);
        if (itemIndex !== -1) {
            const newInventory = [...Inventory];
            // comprorbar si la cantidad a eliminar es mayor a la cantidad en inventario
            if (newInventory[itemIndex].cant > cant) {
                newInventory[itemIndex].cant -= cant;
            } else if (newInventory[itemIndex].cant === cant) {
                // si la cantidad es igual a la cantidad en inventario eliminar el item
                newInventory.splice(itemIndex, 1);
            } else {
                // si la cantidad a eliminar es mayor a la cantidad en inventario
                return;
            }
            setInventory(newInventory);
        } else {
            return;
        }
    }

    return (
        <InventoryContext.Provider value={{ Inventory, addInventory, removeInventory}}>
            {children}
        </InventoryContext.Provider>
    );
}

