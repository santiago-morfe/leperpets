import NavComponent from "../../components/NavComponent"
import { useContext, useState} from "react"
import { InventoryContext } from "../../contexts/InventoryContext"
import { WalletContext } from "../../contexts/WalletContext"
import ItemInventory from "./components/ItemInventory"
import ItemFocus from "./components/ItemFocus"


const InventoryScreen = () => {
    const { Inventory } = useContext(InventoryContext)
    const { wallet } = useContext(WalletContext)
    const [focus, setFocus] = useState(null)
    
    const handleFocus = (item) => {
        setFocus(item)
    }



    return (
        <div>
            <NavComponent />
            <h1>Inventario</h1>
            <p>Dinero: {wallet}</p>
            <ul>
                {Inventory.map((item) => (
                    <li key={item.id} onClick={() => handleFocus(item)}>
                    <ItemInventory item={item} />
                    </li>
                ))}
            </ul>
            {focus && <ItemFocus item={focus} setFocus={setFocus} />}
        </div>
    )
}

export default InventoryScreen