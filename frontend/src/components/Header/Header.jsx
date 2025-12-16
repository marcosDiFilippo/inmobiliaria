import { useEffect, useState } from "react"

export function Header ({setCurrentPath, currentPath, statusCode}) {
    const [logOut, setLogOut] = useState(<></>)

    function handleClick () {
        fetch("http://localhost/inmobiliaria/backend/auth/DestroySession.php", {credentials: "include"})
        setCurrentPath("/Login")
        window.history.pushState({}, "", "/Login")
        setLogOut(<></>)
    }

    useEffect(() => {
        if (statusCode == 200) {
            setLogOut(<button onClick={handleClick}>Cerrar Sesion</button>)
        }
        else if (statusCode == 401) {
            setLogOut(<></>)
            window.history.pushState({}, "", "/Login")
        }
    }, [statusCode])

    return (
        <header>
            <h1>Inmobiliaria</h1>
            {logOut}
        </header>
    )
}