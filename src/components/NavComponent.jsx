import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavComponent.module.css';

const NavComponent = () => {
    const [IsOpen, setIsOpen] = useState(false)

    return (
        <nav
            className={styles.nav}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {IsOpen && (
                <ul className={styles.ul}>
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/pets">Mis mascotas</Link>
                    </li>
                    <li>
                        <Link to="/inventory">Inventario</Link>
                    </li>
                    <li>
                        <Link to="/shop">Tienda</Link>
                    </li>
                </ul>
            )}
            <img src="compass.png" className={styles.icon} alt="icon" />
        </nav>
    )

}

export default NavComponent