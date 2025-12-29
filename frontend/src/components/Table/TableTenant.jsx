import { useEffect, useState } from "react"
import { ButtonEdit } from "../ButtonEdit/ButtonEdit"
import { ButtonDelete } from "../ButtonDelete/ButtonDelete"
import { ButtonDetails } from "../ButtonDetails/ButtonDetails"
import styles from "./Table.module.css"
import { useFetch } from "../../hooks/useFetch"

export function TableTenant ({getDataUsers, thList}) {
    const [dataTable, setDataTable] = useState([]) 

    useEffect(() => {
        const dataUsers = getDataUsers()
        
        dataUsers
        .then(result => setDataTable(result))
    }, [])

    const usersFetch = useFetch();

    function handleClickDelete (event) {
        const user = {
            idUser: Number(event.currentTarget.dataset.id)
        }

        if (!Number.isNaN(user.idUser)) {
            usersFetch.getDataFetch("http://localhost/inmobiliaria/backend/controllers/UserController.php","DELETE",{"Content-Type":"application/json"},JSON.stringify(user))
        }
    }

    useEffect(() => {
        console.log(usersFetch.dataFetch)
    }, [usersFetch.dataFetch])

    function handleClickEdit (event) {
        
    }

    function handleClickDetails (event) {
        
    }

    return (
        <table>
            <thead>
                <tr>
                    {thList.map(thElement => (
                        <th key={thElement.id}>{thElement.field}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {dataTable.map(tdElement => (
                    <tr key={tdElement.id_parte_intervinente}>
                        <td>{tdElement.id_parte_intervinente}</td>
                        <td>{tdElement.nombre + " " + tdElement.apellido}</td>
                        <td>{tdElement.fecha_nacimiento}</td>
                        <td>{tdElement.dni}</td>
                        <td>{tdElement.email}</td>
                        <td className={styles.td_actions}>
                            <ButtonEdit handleClickEdit={handleClickEdit}></ButtonEdit>
                            <ButtonDelete id={tdElement.id_parte_intervinente} handleClickDelete={handleClickDelete}></ButtonDelete>
                        </td>
                        <td>
                            <ButtonDetails id={tdElement.id_parte_intervinente} onClick={handleClickDetails}>Ver Detalles</ButtonDetails>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}