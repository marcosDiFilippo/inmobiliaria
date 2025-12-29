import { useState } from "react"

export function useFetch () {
    const [dataFetch, setDataFetch] = useState(null)
    
    async function getDataFetch(
        url, 
        methodRequest = "GET", 
        headersRequest = {"Content-Type":"application/json"}, 
        bodyRequest = null
    ) 
    {
        let structureResponse = {
            method: methodRequest,
            headers: headersRequest
        }

        if (bodyRequest && methodRequest != "GET") {
            structureResponse.body = bodyRequest
        }

        const response = await fetch(url, structureResponse)

        const result = await response.json()

        setDataFetch(result)
    }

    return {
        dataFetch,
        getDataFetch 
    }
}