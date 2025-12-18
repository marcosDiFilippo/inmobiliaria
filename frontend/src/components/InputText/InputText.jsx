import styles from './Input.module.css';

export function InputText({ type = "text", name = "", placeholder = "", error = "" }) {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            className={`${styles.input} ${error ? styles.error : ''}`}
        />
    );
}
