import { useState } from "react";
import styles from "./Login.module.css";

export function Login({setCurrentPath, setSession}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(<></>)
    
    async function getData () {
        const data = await fetch("http://localhost/inmobiliaria/backend/controllers/LoginController.php", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: "email=" + email + "&password=" + password,
            credentials: "include"
        })
        
        const statusCode = await data.status

        if (statusCode === 404) {
            setAlert(
                <div>
                    <p>No se ha podido encontrar al usuario,</p>
                    <p>Por favor vuelva ingresar.</p>
                </div>
            )
        }
        else {
            setAlert(
                <div>
                    <p>Sesion iniciada con exito</p>
                </div>
            )

            const dataSession = await fetch("http://localhost/inmobiliaria/backend/auth/Session.php", {
                method: "GET",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                credentials: "include"
            })
            const jsonSession = await dataSession.json();
            
            setSession(jsonSession)
            window.history.pushState({}, "", "/Home")
            setCurrentPath("/Home")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        getData()
    };

    return (
        <div className={styles.container}>
            {alert}
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