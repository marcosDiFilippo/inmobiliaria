import styles from "./Link.module.css";

export function Link({ href, text }) {
    return (
        <a href={href} className={styles.link}>
            {text}
        </a>
    );
}