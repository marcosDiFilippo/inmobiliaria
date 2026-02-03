import { useEffect, useState } from "react"
import styles from "./Header.module.css"

export function Header ({currentPath, statusCode, links, navigateTo}) {
    const [logOut, setLogOut] = useState(<></>)

    function handleClick () {
        fetch("http://localhost/inmobiliaria/backend/auth/DestroySession.php", {credentials: "include"})
        navigateTo("/Login")
        setLogOut(<></>)
    }

    useEffect(() => {
        if (statusCode == 200) {
            setLogOut(<button className={styles.button_logout} onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
                Cerrar Sesion
            </button>)
        }
        else if (statusCode == 401) {
            setLogOut(<></>)
            navigateTo("/Login")
        }
    }, [statusCode])

    return (
        (currentPath.includes("/Login") ? <></> : <header>
            {links}
            {logOut}
        </header>)
    )
}