import { useParams } from "react-router-dom"

const ProductScreen = () => {
    const { id } = useParams()
    return (
        <div>
            <h1>Product</h1>
            <h2>{id}</h2>
        </div>
    )
}

export default ProductScreen