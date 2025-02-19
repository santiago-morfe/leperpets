import NavComponent from "../../components/NavComponent"
import { useContext, useState } from "react"
import { InventoryContext } from "../../contexts/InventoryContext"
import { WalletContext } from "../../contexts/WalletContext"
import ItemInventory from "./components/ItemInventory"
import ItemFocus from "./components/ItemFocus"
import styles from './InventoryScreen.module.css'

const InventoryScreen = () => {
    const { Inventory } = useContext(InventoryContext)
    const { wallet } = useContext(WalletContext)
    const [focus, setFocus] = useState(null)

    const handleFocus = (item) => {
        setFocus(item)
    }

    return (
        <div className={styles.container}>
            <NavComponent />
            {focus &&
                <div className={styles.focusContainer}>
                    <button
                        className={styles.closeButton}
                        onClick={() => setFocus(null)}
                    >
                        X
                    </button>
                    <ItemFocus item={focus} />
                </div>
            }
            <div className={styles.mainContent}>
                <h1 className={styles.title}>Inventario</h1>
                <div className={styles.walletDisplay}>
                    <p className={styles.walletAmount}>Dinero: {wallet}</p>
                </div>
                <div className={styles.inventoryContainer}>
                    <ul className={styles.inventoryList}>
                        {Inventory.map((item) => (
                            <li
                                key={item.id}
                                className={styles.inventoryItem}
                                onClick={() => handleFocus(item)}
                            >
                                <ItemInventory item={item} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default InventoryScreen