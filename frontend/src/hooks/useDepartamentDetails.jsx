import { useState } from "react"

export function useDepartamentDetails () {
    const [result, setResult] = useState(null)

    async function getDepartamentDetails(id_inmueble, setDetails) {
        const response = await fetch("http://localhost/inmobiliaria/backend/repository/DepartamentDetails.php", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "idInmueble=" + id_inmueble
            }
        )
    
        const resultJson = await response.json()

        setResult(resultJson)
    }

    return {
        getDepartamentDetails,
        result
    }
}