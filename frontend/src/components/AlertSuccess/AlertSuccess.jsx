import styles from './AlertSuccess.module.css';

export function AlertSuccess({ message }) {
    if (!message) return null;

    return (
        <div className={styles.alert}>
            {message}
        </div>
    );
}
