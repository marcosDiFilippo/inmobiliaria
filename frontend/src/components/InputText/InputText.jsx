import styles from './Input.module.css';

export function InputText({
    type = "text",
    name = "",
    placeholder = "",
    error = "",
    className = "",
    ...props
}) {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            className={`${styles.input} ${error ? styles.error : ''} ${className}`}
            {...props}
        />
    );
}
