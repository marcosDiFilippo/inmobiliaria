import styles from './Button.module.css';

export function ButtonSubmit({ text = "Guardar", disabled }) {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={styles.button}
        >
            {text}
        </button>
    );
}
