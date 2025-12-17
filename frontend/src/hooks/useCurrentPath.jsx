import { useState } from "react"

export function useCurrentPath () {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)

    return {
        currentPath,
        setCurrentPath
    }
}