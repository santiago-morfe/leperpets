import { useEffect } from 'react';
import styles from './HomeScreen.module.css';

const HomeScreen = () => {
    const handlePlay = () => {
        window.location.href = '/pets';
    };

    useEffect(() => {
        // Create stars
        const starsContainer = document.createElement('div');
        starsContainer.className = styles.stars;
        
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = styles.star;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 1}s`;
            starsContainer.appendChild(star);
        }
        
        document.querySelector(`.${styles.container}`).appendChild(starsContainer);
        
        return () => starsContainer.remove();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Home Screen</h1>
            <button 
                className={styles.playButton}
                onClick={handlePlay}
            >
                Play
            </button>
        </div>
    );
};

export default HomeScreen;