import { useEffect, useState } from "react"
import styles from "./Table.module.css"
import { ButtonEdit } from "../ButtonEdit/ButtonEdit.jsx"
import { ButtonDelete } from "../ButtonDelete/ButtonDelete.jsx"
import { ButtonDetails } from "../ButtonDetails/ButtonDetails.jsx"
import { Link } from "../../router/Link/Link.jsx"

export function Table ({thList, getData, navigateTo}) {
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
    
    function handleClickDetails (event) {
        const id_inmueble = Number(event.target.dataset.id)
        
        navigateTo("/DepartamentDetails?idInmueble=" + id_inmueble);
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
                            <ButtonDetails id={tdElement.id_inmueble} onClick={handleClickDetails}>Ver Detalles</ButtonDetails>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}