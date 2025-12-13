import { useState } from "react";
import styles from "./Login.module.css";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // aca despues conectas con el backend
        console.log({
        email,
        password,
        });
    };

    return (
        <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Iniciar sesión</h2>
            <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input
                    type="email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Contraseña</label>
                <input
                    type="password"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className={styles.button}>
                Entrar
            </button>
        </form>
        </div>
    );
}