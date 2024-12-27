import { useEffect, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'

const ShopScreen = () => {

    const [products, setProducts] = useState([])
    const { addItem } = useContext(CartContext)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('../data/items.json')
                const data = await response.json()
                setProducts(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchProducts()
    }, [])

    return (
        <div>
            <h1>Shop</h1>
            <div>
                {products.map((product) => (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <button>Buy</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShopScreen