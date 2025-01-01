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

    // eliminar item del carrito de a uno
    const removeItem = (item) => {
        const itemIndex = cart.findIndex((i) => i.id === item.id)
        if (itemIndex !== -1) {
            const newCart = [...cart]
            if (newCart[itemIndex].cant > 1) {
                newCart[itemIndex].cant -= 1
            } else {
                newCart.splice(itemIndex, 1)
            }
            setCart(newCart)
        }
    }

    // limpiar el carrito
    const clearCart = () => {
        setCart([])
    }

    // total
    const getTotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.cant, 0)
    }

    // cantidad de items
    const getItemsCount = () => {
        return cart.reduce((acc, item) => acc + item.cant, 0)
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, getTotal, getItemsCount }}>
            {children}
        </CartContext.Provider>
    )
}