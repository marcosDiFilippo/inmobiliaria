import styles from './Textarea.module.css';

export function Textarea({
    name,
    placeholder,
    error
}) {
    return (
        <textarea
            name={name}
            placeholder={placeholder}
            className={`${styles.textarea} ${error ? styles.error : ''}`}
        />
    );
}
