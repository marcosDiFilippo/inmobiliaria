export function getId (event) {
    if (event.currentTarget.dataset.id === undefined || event.currentTarget.dataset.id === null) {
        return null
    }
    return Number(event.currentTarget.dataset.id)
}