import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

const LoadingComponent = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + Math.random() * 10;
            });
        }, 200);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.loadingText}>Loading</h1>
            <div className={styles.progressBar}>
                <div 
                    className={styles.progress} 
                    style={{ width: `${Math.min(progress, 100)}%` }}
                />
                <span className={styles.percentage}>
                    {Math.min(Math.round(progress), 100)}%
                </span>
            </div>
            <div className={styles.pixelDots}>
                <div className={styles.dot} />
                <div className={styles.dot} />
                <div className={styles.dot} />
            </div>
        </div>
    );
};

export default LoadingComponent;