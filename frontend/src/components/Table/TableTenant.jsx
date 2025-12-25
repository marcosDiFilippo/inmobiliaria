import { useEffect, useState } from "react"
import { ButtonEdit } from "../ButtonEdit/ButtonEdit"
import { ButtonDelete } from "../ButtonDelete/ButtonDelete"
import { ButtonDetails } from "../ButtonDetails/ButtonDetails"
import styles from "./Table.module.css"

export function TableTenant ({getDataUsers, thList}) {
    const [dataTable, setDataTable] = useState([]) 

    useEffect(() => {
        const dataUsers = getDataUsers()
        
        dataUsers
        .then(result => setDataTable(result))
    }, [])

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
                            <ButtonEdit></ButtonEdit>
                            <ButtonDelete></ButtonDelete>
                        </td>
                        <td>
                            <ButtonDetails>Ver Detalles</ButtonDetails>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}