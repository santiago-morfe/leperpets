import { createContext, useEffect, useState } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    // Funciones para interactuar con el carrito
    const addItem = (item) => {
        const itemIndex = cart.findIndex((i) => i.id === item.id)
        if (itemIndex !== -1) {
            const newCart = [...cart]
            newCart[itemIndex].cant += 1
            setCart(newCart)
        } else {
            setCart([...cart, { ...item, cant: 1 }])
        }
    }

    // eliminar items del carrito
    const removeItem = (id) => {
        const itemIndex = cart.findIndex((i) => i.id === id)
        if (itemIndex !== -1) {
            const newCart = [...cart]
            newCart.splice(itemIndex, 1)
            setCart(newCart)
        }
    }

    // obtener el carrito
    const getCart = () => {
        return cart
    }

    // limpiar el carrito
    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{ addItem, removeItem, getCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}