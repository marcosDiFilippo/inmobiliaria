import { useState } from "react"

export function useFetch () {
    const [dataFetch, setDataFetch] = useState(null)

    async function getDataFetch(
        url,
        methodRequest = "GET",
        headersRequest = null,
        bodyRequest = null
    ) {
        const structureRequest = {
            method: methodRequest
        }

        //cuando solo se pone la solo el nombre de la variable en el if es porque verifica si no es null o undefined, es lo mismo que poner (headersRequest != null && headersRequest != undefined)
        if (headersRequest) {
            structureRequest.headers = headersRequest
        }

        if (bodyRequest && methodRequest !== "GET") {
            structureRequest.body = bodyRequest
        }

        const response = await fetch(url, structureRequest)
        const result = await response.json()
        setDataFetch(result)
    }

    return { dataFetch, getDataFetch }
}