import styles from './AlertError.module.css';

export function AlertError({ message }) {
    if (!message) return null;

    return (
        <div className={styles.alert}>
            {message}
        </div>
    );
}