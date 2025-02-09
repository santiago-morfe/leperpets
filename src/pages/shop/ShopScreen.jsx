import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { WalletContext } from '../../contexts/WalletContext'
import { Link } from 'react-router-dom'
import CartComponent from '../../components/CartComponent.jsx'
import NavComponent from '../../components/NavComponent.jsx'
import ITEMS_DATA from '../../data/itemsData'

const ShopScreen = () => {
    const { addItem } = useContext(CartContext)
    const { wallet } = useContext(WalletContext)

    return (
        <>
            <NavComponent />
            <CartComponent />
            <h1>tiendita</h1>
            <h2>monedas: </h2>
            <p>{wallet}</p>
            <h2>productos</h2>
            <ul>
                {ITEMS_DATA.map((item) => (
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