import styles from './ManualScreen.module.css';

const ManualScreen = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Manual de Usuario</h1>
            <div className={styles.content}>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Controles Básicos</h2>
                    <ul className={styles.commandList}>
                        <li className={styles.command}>
                            <span className={styles.keyBind}>↑</span>
                            Navegar hacia arriba
                        </li>
                        <li className={styles.command}>
                            <span className={styles.keyBind}>Space</span>
                            Seleccionar item
                        </li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Inventario</h2>
                    <p className={styles.tip}>
                        Haz clic en cualquier item para ver sus detalles
                    </p>
                    <div className={styles.shortcut}>
                        Abrir inventario: I
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Consejos</h2>
                    <ul className={styles.commandList}>
                        <li className={styles.tip}>
                            Mantén tu inventario organizado
                        </li>
                        <li className={styles.tip}>
                            Revisa regularmente tus items
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ManualScreen;