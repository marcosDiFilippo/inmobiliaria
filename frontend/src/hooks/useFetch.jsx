import { useState } from "react"

export function useFetch () {
    const [dataFetch, setDataFetch] = useState(null)
    
    async function getDataFetch(url, methodRequest = "", headersRequest = {"Content-Type":"application/x-www-form-urlencoded"}, bodyRequest = "") {
        const response = await fetch(url, {
            method: methodRequest,
            headers: headersRequest,
            body: bodyRequest
        })

        const result = await response.json()

        setDataFetch(result)
    }

    return {
        dataFetch,
        getDataFetch 
    }
}