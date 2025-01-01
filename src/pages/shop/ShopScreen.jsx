import { useState, useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { WalletContext } from '../../contexts/WalletContext'
import { items } from '../../data/items'
import { Link } from 'react-router-dom'
import CartComponent from '../../components/CartComponent.jsx'

const ShopScreen = () => {
    const { addItem } = useContext(CartContext)
    const { wallet } = useContext(WalletContext)
    const [itemList] = useState(items)


    return (
        <>
            <CartComponent />
            <h1>tiendita</h1>
            <h2>monedas: </h2>
            <p>{wallet}</p>
            <h2>productos</h2>
            <ul>
                {itemList.map((item) => (
                    <li key={item.id}>
                        <Link to={`/shop/${item.id}`}>
                            <p>{item.name} - {item.price}</p>
                        </Link>
                        <button onClick={() => addItem(item)}>Agregar al carrito</button>

                    </li>
                ))}
            </ul>
        </>
    )
}

export default ShopScreen