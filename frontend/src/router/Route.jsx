import { NotFound } from "../pages/NotFound/NotFound"

export function Route ({ path, component: Component, ...props }) {
    const currentPath = window.location.pathname.replace(/\/$/, "")

    if (path === currentPath) { 
        return <Component {...props}></Component>
    }
    return <NotFound></NotFound>
}