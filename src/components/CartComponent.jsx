import { useContext, useState, useEffect } from 'react'
import { CartContext } from '../contexts/CartContext'
import { WalletContext } from '../contexts/WalletContext'
import { InventoryContext } from '../contexts/InventoryContext'
import styles from './CartComponent.module.css'

const CartComponent = () => {
    const { cart, removeItem, addItem, clearCart, getTotal, getItemsCount } = useContext(CartContext)
    const { wallet, removeMoney } = useContext(WalletContext)
    const { addInventory } = useContext(InventoryContext)
    const [isVisible, setIsVisible] = useState(false)

    // Manejar el escape key para cerrar el carrito
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isVisible) {
                setIsVisible(false)
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isVisible])

    // Prevenir scroll del body cuando el carrito está abierto
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isVisible])

    const handleBuy = () => {
        if (wallet >= getTotal()) {
            cart.forEach((item) => {
                addInventory(item, item.cant)
            })
            clearCart()
            removeMoney(getTotal())
            setIsVisible(false)
        } else {
            alert('Saldo insuficiente para completar la compra')
        }
    }

    const handleClearCart = () => {
        if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
            clearCart()
            setIsVisible(false)
        }
    }

    const handleIncrement = (item) => {
        addItem(item)

    }
    

    const totalAmount = getTotal()
    const itemCount = getItemsCount()
    const canBuy = wallet >= totalAmount && itemCount > 0

    return (
        <div className={styles.container}>
            {/* Botón del carrito */}
            <button
                className={styles.headerButton}
                onClick={() => setIsVisible(!isVisible)}
                aria-expanded={isVisible}
                aria-controls="cart-content"
                aria-label="Abrir carrito de compras"
            >
                <span className={styles.headerTitle}>
                    🛒
                    {itemCount > 0 && (
                        <span className={styles.itemCount} aria-label={`${itemCount} items en el carrito`}>
                            {itemCount}
                        </span>
                    )}
                </span>
                <span className={styles.wallet} aria-label={`Saldo disponible: ${wallet} monedas`}>
                    <span className={styles.walletIcon} aria-hidden="true">💰</span>
                    {wallet}
                </span>
            </button>

            {/* Modal del carrito */}
            {isVisible && (
                <div
                    className={styles.overlay}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsVisible(false)
                        }
                    }}
                    role="dialog"
                    aria-label="Contenido del carrito"
                >
                    <div
                        id="cart-content"
                        className={styles.cartContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className={styles.sectionTitle}>Carrito de Compras</h2>

                        {itemCount === 0 ? (
                            <p className={styles.emptyMessage}>No hay productos en el carrito</p>
                        ) : (
                            <ul className={styles.productList} role="list">
                                {cart.map((item) => (
                                    <li key={item.id} className={styles.productItem}>
                                        <div className={styles.productInfo}>
                                            <p className={styles.productName}>{item.name}</p>
                                            <p className={styles.productPrice}>
                                                ${item.price}
                                            </p>
                                        </div>

                                        <div
                                            className={styles.quantityControls}
                                            role="group"
                                            aria-label={`Controles de cantidad para ${item.name}`}
                                        >
                                            <button
                                                className={styles.quantityButton}
                                                onClick={() => removeItem(item)}
                                                aria-label={`Reducir cantidad de ${item.name}`}
                                            >
                                                -
                                            </button>
                                            <span className={styles.quantity} aria-label={`Cantidad: ${item.cant}`}>
                                                {item.cant}
                                            </span>
                                            <button
                                                className={styles.quantityButton}
                                                onClick={() => handleIncrement(item)}
                                                disabled={item.cant >= item.stock}
                                                aria-label={`Aumentar cantidad de ${item.name}`}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <p
                                            className={styles.subtotal}
                                            aria-label={`Subtotal: ${item.price * item.cant}`}
                                        >
                                            ${item.price * item.cant}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className={styles.totalSection}>
                            <div>
                                <h3 className={styles.sectionTitle}>Saldo disponible</h3>

                                <p className={styles.wallet} aria-label={`Saldo disponible: ${wallet} monedas`}>
                                    ${wallet}
                                </p>
                            </div>
                            <div>

                                <h3 className={styles.sectionTitle}>Total a pagar</h3>
                                <p className={styles.total} aria-label={`Total: ${totalAmount} monedas`}>
                                    ${totalAmount}
                                </p>
                            </div>
                        </div>
                        <div>
                            <button
                                className={`${styles.button} ${styles.buyButton}`}
                                onClick={handleBuy}
                                disabled={!canBuy}
                                aria-label={
                                    !canBuy && totalAmount > wallet
                                        ? "Saldo insuficiente para completar la compra"
                                        : "Completar compra"
                                }
                            >
                                <span aria-hidden="true">💎</span> Comprar
                            </button>
                            <button
                                className={`${styles.button} ${styles.clearButton}`}
                                onClick={handleClearCart}
                                disabled={itemCount === 0}
                                aria-label="Vaciar carrito"
                            >
                                <span aria-hidden="true">🗑️</span> Limpiar carrito
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartComponent