import {Link} from 'react-router-dom';
import {useState, useRef, useEffect} from 'react';

const NavComponent = () => {

    const  [IsOpen, setIsOpen] = useState(false)
    const navRef = useRef(null)

    const handleClick = (e) => {
        if (navRef.current && !navRef.current.contains(e.target)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    return (
        <nav ref={navRef}>
            <button onClick={() => setIsOpen(!IsOpen)}>Menu</button>
            {IsOpen && (
                <ul>
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
        </nav>
    )

}

export default NavComponent