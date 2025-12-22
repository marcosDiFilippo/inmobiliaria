import styles from './ButtonDetails.module.css';

export function ButtonDetails({ id, onClick, children }) {
    return (
        <button
            data-id={id}
            onClick={onClick}
            className={styles.button}
        >
            {children}
        </button>
    );
}