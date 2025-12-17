import { useEffect, useState } from "react"
import { Link } from "../router/Link/Link.jsx"
import { useCurrentPath } from "./useCurrentPath.jsx"

export function useLinks () {
    const { currentPath, setCurrentPath } = useCurrentPath()
    const [statusCode, setStatusCode] = useState(0)
    const [links, setLinks] = useState(<></>)

    function verificateStatusCode () {
        fetch("http://localhost/inmobiliaria/backend/auth/Session.php", { credentials: "include" })
            .then(res => {
            setStatusCode(res.status)
            console.log("status en useLinks: " + statusCode)
            if (statusCode == 200) {
                setLinks(<><Link href={"/Tenant"} text={"Inquilinos"}></Link>
                <Link href={"/Departament"} text={"Departamentos"}></Link></>)
            }
            else {
                setLinks(<></>)
            }
        })
    }

    function changePath () {
        function handlePathChange () {
            setCurrentPath(window.location.pathname)
        }

        window.addEventListener("popstate", handlePathChange)

        return () => {
            window.removeEventListener("popstate", handlePathChange)
        }
    }

    return {
        links,
        statusCode,
        setStatusCode,
        setLinks,
        verificateStatusCode,
        changePath
    }
}