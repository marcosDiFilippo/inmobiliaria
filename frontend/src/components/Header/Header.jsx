import { useEffect, useState } from "react"

export function Header ({currentPath, statusCode, links, navigateTo}) {
    const [logOut, setLogOut] = useState(<></>)

    function handleClick () {
        fetch("http://localhost/inmobiliaria/backend/auth/DestroySession.php", {credentials: "include"})
        navigateTo("/Login")
        setLogOut(<></>)
    }

    useEffect(() => {
        if (statusCode == 200) {
            setLogOut(<button onClick={handleClick}>Cerrar Sesion</button>)
        }
        else if (statusCode == 401) {
            setLogOut(<></>)
            navigateTo("/Login")
        }
    }, [statusCode])

    return (
        (currentPath.includes("/Login") ? <></> : <header>
            <h1>Inmobiliaria</h1>
            {logOut}
            {links}
        </header>)
    )
}