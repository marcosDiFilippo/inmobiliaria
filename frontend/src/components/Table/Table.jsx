import { useEffect, useState } from "react"
import styles from "./Table.module.css"
import { ButtonEdit } from "../ButtonEdit/ButtonEdit.jsx"
import { ButtonDelete } from "../ButtonDelete/ButtonDelete.jsx"

export function Table ({thList, getData}) {
    const [dataTable, setDataTable] = useState([])

    const data = getData()
    
    useEffect(() => {
        data
            .then(result => setDataTable(result))
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    {thList.map(thElement => (  
                        <th key={thElement.id}>{thElement.field !== "Estado" ? thElement.field : "Acciones"}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {dataTable.map(tdElement => (
                    <tr key={tdElement.id_inmueble}>
                        <td>{tdElement.calle + " " + tdElement.numero_dpto}</td>
                        <td>{tdElement.fecha_creacion}</td>
                        <td>{tdElement.precio_venta}</td>
                        <td>{tdElement.precio_alquiler}</td>
                        <td>{tdElement.descripcion}</td>
                        <td>{tdElement.tipo}</td>
                        <td className={styles.td_actions}>
                            <ButtonEdit></ButtonEdit>
                            <ButtonDelete></ButtonDelete>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}