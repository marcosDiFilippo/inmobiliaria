import { useState } from "react"
import { Link } from "../router/Link/Link.jsx"

export function useLinks () {
    const [statusCode, setStatusCode] = useState(0)
    const [links, setLinks] = useState(<></>)

    function verificateStatusCode () {
        fetch("http://localhost/inmobiliaria/backend/auth/Session.php", { credentials: "include" })
            .then(res => {
            setStatusCode(res.status)
            if (statusCode == 200) {
                setLinks(<><Link href={"/Tenant"} text={"Inquilinos"}></Link>
                <Link href={"/Departament"} text={"Departamentos"}></Link></>)
            }
            else {
                setLinks(<></>)
            }
        })
    }

    function changePath (setCurrentPath) {
        function handlePathChange () {
            setCurrentPath(window.location.pathname)
        }

        window.addEventListener("popstate", handlePathChange)

        return () => {
            window.removeEventListener("popstate", handlePathChange)
        }
    }
    
    function navigateTo (href) {
        window.history.pushState({}, "", href)
        window.dispatchEvent(new PopStateEvent("popstate"))
    }

    return {
        links,
        statusCode,
        setStatusCode,
        setLinks,
        verificateStatusCode,
        changePath,
        navigateTo
    }
}