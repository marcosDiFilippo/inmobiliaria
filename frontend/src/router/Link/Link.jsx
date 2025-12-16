import styles from "./Link.module.css";

export function Link({ href, text }) {
    function handleClick (e) {
        e.preventDefault()

        window.history.pushState({}, "", href)
        window.dispatchEvent(new PopStateEvent("popstate"))
    }

    return (
        <a href={href} className={styles.link} onClick={handleClick}>
            {text}
        </a>
    );
}