export function Route ({ path, component: Component, ...props }) {
    const currentPath = window.location.pathname.replace(/\/$/, "")

    if (path === currentPath) { 
        return <Component {...props}></Component>
    }
    return null
}