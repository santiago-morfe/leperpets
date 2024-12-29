import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../contexts/CartContext'
import { items } from '../../data/items'

const ShopScreen = () => {

    const [products] = useState(items)
    const { addItem } = useContext(CartContext)

    const handleBuy = (product) => {
        addItem(product)
    }

    return (
        <div>
            <h1>Shop</h1>
            <div>
                {products.map((product) => (
                    <div key={product.id}>
                        <Link to={`/product/${product.id}`}>
                            <h2>{product.name}</h2>
                        </Link>
                        <p>{product.price}</p>
                        <button onClick={() => handleBuy(product)}>Buy</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShopScreen