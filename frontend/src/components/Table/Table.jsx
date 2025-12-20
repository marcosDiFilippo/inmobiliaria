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
    
    function handleClickEdit (event) {
        event.preventDefault()
    }

    function handleClickDelete (event) {
        event.preventDefault()
    }

    function handleClick (event) {
        event.preventDefault()
    }

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
                        <td>$ {tdElement.precio_venta}</td>
                        <td>$ {tdElement.precio_alquiler}</td>
                        <td>{tdElement.tipo}</td>
                        <td className={styles.td_actions}>
                            <ButtonEdit handleClickEdit={handleClickEdit}></ButtonEdit>
                            <ButtonDelete handleClickDelete={handleClickDelete}></ButtonDelete>
                        </td>
                        <td>
                            <button onClick={handleClick}>Ver Detalles</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}