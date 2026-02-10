import { isNumber } from "../hooks/useIsNumber"

export function Route ({ path, currentPath ,component: Component, ...props }) {
    if (path === currentPath) { 
        return <Component {...props}></Component>
    }
    
    const id = Number(currentPath.at(-1))

    if (path.includes(":id") && isNumber(id)) {
        return <Component {...props}></Component>
    }

    return null
}