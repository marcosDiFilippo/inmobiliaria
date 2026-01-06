import styles from "./Input.module.css";

export function InputFile({ textLabel, name, ...props }) {
    return (
        <>
        <input
            type="file"
            name={name}
            id={name}
            {...props}
        />
        <label
            htmlFor={name}
            className={styles.input_file_label}
        >
            {textLabel}
        </label>
        </>
    );
}