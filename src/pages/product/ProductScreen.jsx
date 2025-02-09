import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { CartContext } from "../../contexts/CartContext"
import CartComponent from "../../components/CartComponent"
import NavComponent from "../../components/NavComponent"
import ITEMS_DATA from "../../data/itemsData.ts"

const ProductScreen = () => {


    const { productId } = useParams()
    const [ product, setProduct ] = useState(null)
    const { addItem } = useContext(CartContext)

    useEffect(() => {
        const newProduct = ITEMS_DATA.find((item) => item.id === parseInt(productId))
        setProduct(newProduct)
    }, [productId])

    if (!product) {
        return <h1>Product not found</h1>
    }

    return (
        <>
            <NavComponent />
            <CartComponent />
            <h1>{product.name}</h1>
                <div>
                    <p>{product.price}</p>
                    <p>{product.description}</p>
                    <button onClick={() => addItem(product)}>Buy</button>
                </div>
        </>
    )
}

export default ProductScreen