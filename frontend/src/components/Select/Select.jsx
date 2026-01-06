import styles from './Select.module.css';

export function Select({name, options: array, ...props}) {
    return (
        <select
            name={name}
            id={name}
            className={styles.select}
            {...props}
        >
            {array.map(element => (
                <option key={element.id} value={element.id}>{element.name}</option>
            ))}
        </select>
    );
}
