export function Route ({ path, currentPath ,component: Component, ...props }) {
    if (path === currentPath) { 
        return <Component {...props}></Component>
    }
    return null
}