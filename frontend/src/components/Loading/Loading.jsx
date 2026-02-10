import { useEffect, useState } from "react";
import styles from "./Loading.module.css";

export default function Loading({
    text = "Cargando",
    speed = 500,
    }) {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
        setDots((prev) => (prev.length === 3 ? "" : prev + "."));
        }, speed);

        return () => clearInterval(interval);
    }, [speed]);

    return (
        <div className={styles.loading_overlay}>
        <div className={styles.loading_box}>
            <span className={styles.loading_text}>
            {text}
            {dots}
            </span>
        </div>
        </div>
    );
}