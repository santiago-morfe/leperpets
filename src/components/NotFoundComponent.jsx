import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1 className={styles.glitchText}>404</h1>
            <pre className={styles.pixelArt}>
                ⠀⠀⠀⠀⠀⠀⢀⣠⣤⣤⣤⣤⣤⣄⡀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⢀⣴⣿⡿⠛⠉⠙⠛⠛⠛⠛⠻⢿⣿⣷⣤⡀⠀
                ⠀⠀⠀⠀⣼⣿⠋⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⠈⢻⣿⣿⡄
                ⠀⠀⠀⣸⣿⡏⠀⠀⠀⣠⣶⣾⣿⣿⣿⠿⠿⠿⢿⣿⣿⣿
                ⠀⠀⢀⣿⣿⢀⠀⠀⣾⣿⠟⠉⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿
                ⠀⠀⣿⣿⡇⠀⠀⠀⠻⢿⣿⣿⣿⣿⣿⠿⣿⡏⠀⠀⠀⠀
                ⠀⠀⢿⣿⡇⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⣿⣿⠃⠀⠀⠀⠀
                ⠀⠀⠈⢿⣷⣄⡀⠀⠀⠀⣀⣠⣤⣤⣶⣿⠃⠀⠀⠀⠀
                ⠀⠀⠀⠀⠻⢿⣿⣿⣿⣿⡿⠿⠟⠋⠁⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
            </pre>
            <p className={styles.message}>
                Oops! Parece que te has perdido en el pixel-verso. 
                Esta página no existe en ninguna dimensión conocida.
            </p>
            <button 
                className={styles.homeButton}
                onClick={() => navigate('/')}
            >
                Volver al Inicio
            </button>
        </div>
    );
};

export default NotFound;