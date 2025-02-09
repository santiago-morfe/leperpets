import { Link } from "react-router-dom"
import NavComponent from "../../components/NavComponent"
import { useContext } from "react"
import { InventoryContext } from "../../contexts/InventoryContext"

const InventoryScreen = () => {
    const { Inventory } = useContext(InventoryContext)

    return (
        <div>
            <NavComponent />
            <h1>Inventario</h1>
            <ul>
                {Inventory.map((item) => (
                    <li key={item.id}>
                        <Link to={`/shop/${item.id}`}>
                            <p>{item.name} - {item.quantity}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default InventoryScreen