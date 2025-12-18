
import { useLinks } from "../../hooks/useLinks";
import styles from "./Link.module.css";

export function Link({ href, text }) {
    const { navigateTo } = useLinks()

    function handleClick (e) {
        e.preventDefault()

        navigateTo(href)
    }

    return (
        <a href={href} className={styles.link} onClick={handleClick}>
            {text}
        </a>
    );
}