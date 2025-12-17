export function useDepartament () {
    async function getDataDepartament() {
        const data = await fetch("http://localhost/inmobiliaria/backend/repository/DepartamentRepo.php", {
            method: "GET",      
        })

        const json = await data.json()

        return json
    }   

    return {
        getDataDepartament
    }
}