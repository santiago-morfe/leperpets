import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { WalletContext } from '../../contexts/WalletContext'
import { Link } from 'react-router-dom'
import CartComponent from '../../components/CartComponent'
import NavComponent from '../../components/NavComponent'
import ITEMS_DATA from '../../data/itemsData'
import styles from './ShopScreen.module.css'

const ShopScreen = () => {
    const { addItem, cart } = useContext(CartContext)
    const { wallet } = useContext(WalletContext)

    const isItemInCart = (itemId) => {
        return cart.some(item => item.id === itemId && item.cant )
    }

    return (
        <div className={styles.container}>
            <NavComponent />
            <CartComponent />
            
            <h1 className={styles.title}>Tiendita</h1>
            
            <div className={styles.walletSection}>
                <h2 className={styles.walletTitle}>Monedas disponibles</h2>
                <p className={styles.walletAmount}>
                    <span role="img" aria-label="monedas">💰</span>
                    {wallet}
                </p>
            </div>

            <h2 className={styles.productsTitle}>Productos</h2>
            
            {ITEMS_DATA.length === 0 ? (
                <div className={styles.emptyState}>
                    No hay productos disponibles en este momento
                </div>
            ) : (
                <ul className={styles.productsList}>
                    {ITEMS_DATA.map((item) => (
                        <li key={item.id} className={styles.productCard}>
                            <Link to={`/shop/${item.id}`} className={styles.productLink}>
                                <h3 className={styles.productName}>{item.name}</h3>
                                <p className={styles.productPrice}>💎 {item.price}</p>
                            </Link>
                            <button 
                                className={styles.addButton}
                                onClick={() => addItem(item)}
                                disabled={isItemInCart(item.id)}
                            >
                                {isItemInCart(item.id) ? 'en carrio' : 'Agregar al carrito'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ShopScreen