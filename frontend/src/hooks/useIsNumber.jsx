export function isNumber (value) {
    if (value === undefined || value === null) {
        return false;
    }
    if (typeof value === 'number' && !isNaN(value)) {
        return true;
    }
    return false;
}