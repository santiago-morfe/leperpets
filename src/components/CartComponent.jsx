import { useContext, useState } from 'react'
import { CartContext } from '../contexts/CartContext'
import { WalletContext } from '../contexts/WalletContext'
import { InventoryContext } from '../contexts/InventoryContext'

const CartComponent = () => {
    const { cart, removeItem, addItem, clearCart, getTotal, getItemsCount } = useContext(CartContext)
    const { wallet, removeMoney } = useContext(WalletContext)
    const { addInventory } = useContext(InventoryContext)
    const [isvisible, setIsVisible] = useState(false)

    // comprar
    const buy = () => {
        if (wallet >= getTotal()) {
            cart.forEach((item) => {
                addInventory(item, item.cant)
            })
            clearCart()
            removeMoney(getTotal())
        }
    }

    const hanldeClickBuy = () => {
        if (wallet >= getTotal()) {
            buy()
        }else{
            alert('No tienes suficiente dinero')
        }
    }

    return (
        <div>
            <h2 onClick={() => setIsVisible(!isvisible)} >Carrito {getItemsCount()}</h2>
            <span>{wallet}</span>
            {isvisible && (
                <div>
                    <button onClick={() => clearCart()}>Limpiar carrito</button>
                    <h3>Productos</h3>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                <p>{item.name} - {item.price}</p>
                                <button onClick={() => removeItem(item)}>-</button>
                                {item.cant}
                                <button onClick={() => addItem(item)}>+</button>
                                <p>{item.price * item.cant}</p>
                            </li>
                        ))}
                    </ul>
                    <h3>Total</h3>
                    <p>{getTotal()}</p>
                    <button onClick={hanldeClickBuy}>Comprar</button>
                </div>
            )}
        </div>
    )
}

export default CartComponent