import styles from "./NotFound.module.css";

export function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Página no encontrada</h2>
                <p className={styles.text}>
                La página que estás buscando no existe.
                </p>
            </div>
        </div>
    );
}