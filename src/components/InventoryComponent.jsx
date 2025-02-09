import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../contexts/CartContext'

const InventoryComponent = () => {
    const { inventory, removeItem } = useContext(CartContext)
    const [isvisible, setIsVisible] = useState(false)

    return (
        <div>
            <h2 onClick={() => setIsVisible(!isvisible)} >Inventario</h2>
            {isvisible && (
                <div>
                    <h3>inventario</h3>
                    <ul>
                        {inventory.map((item) => (
                            <li key={item.id}>
                                <Link to={`/shop/${item.id}`}>{item.name} {'('+item.cant+')'}</Link>
                                <button onClick={() => removeItem(item)}> eliminar </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default InventoryComponent