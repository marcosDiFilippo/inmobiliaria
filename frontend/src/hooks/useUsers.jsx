export function useUsers () {
    async function getDataUsers() {
        const response = await fetch("http://localhost/inmobiliaria/backend/controllers/UserController.php", {
            method: "GET"
        })

        const json = await response.json()

        return json
    }

    return {
        getDataUsers
    }
}