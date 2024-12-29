import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { items } from "../../data/items.json"
import { CartContext,  } from "../../contexts/CartContext"

const ProductScreen = () => {


    const { productId } = useParams()
    const [product, setProduct] = useState(null)
    const { addItem } = useContext(CartContext)

    useEffect(() => {
        const newProduct = items.find((item) => item.id === parseInt(productId))
        setProduct(newProduct)
    }, [productId])

    if (!product) {
        return <h1>Product not found</h1>
    }

    return (
        <div>
            <h1>Product</h1>
            {product && (
                <div>
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                    <p>{product.description}</p>
                    <button onClick={() => addItem(product)}>Buy</button>
                </div>
            )}
        </div>
    )
}

export default ProductScreen