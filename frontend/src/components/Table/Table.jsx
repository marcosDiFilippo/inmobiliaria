import { useEffect, useState } from "react"
import styles from "./Table.module.css"
import { ButtonEdit } from "../ButtonEdit/ButtonEdit.jsx"
import { ButtonDelete } from "../ButtonDelete/ButtonDelete.jsx"
import { ButtonDetails } from "../ButtonDetails/ButtonDetails.jsx"
import { AlertError } from "../AlertError/AlertError.jsx"

export function Table ({thList, getData, navigateTo, setAlert}) {
    const [ dataTable, setDataTable] = useState([])
    const [dataDelete, setDataDelete] = useState("")
    
    useEffect(() => {
        const data = getData()
        
        data
            .then(result => setDataTable(result))
    }, [dataDelete])
    
    function handleClickEdit (event) {
        event.preventDefault()
    }

    function handleClickDelete (event) {
        event.preventDefault()
        const id_inmueble = Number(event.currentTarget.dataset.id)

        if (!id_inmueble) {
            return; 
        }

        fetch("http://localhost/inmobiliaria/backend/controllers/DepartamentController.php", {
            method: "DELETE",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                idInmueble: id_inmueble
            })
        })
        .then((response) => response.json())
        .then(newData => {
            setDataDelete(newData)
        })
        .catch(error => error)
    }
    
    useEffect(() => {
        if (dataDelete.success == true) {
            setAlert(<AlertError message={"Se ha eliminado correctamente el inmueble"}></AlertError>)
        }
    }, [dataDelete])

    console.log(dataDelete)

    function handleClickDetails (event) {
        event.preventDefault()
        const id_inmueble = Number(event.target.dataset.id)
        
        navigateTo("/DepartamentDetails?idInmueble=" + id_inmueble);
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
                    <tr key={tdElement.id_inmueble}>
                        <td>{tdElement.calle + " " + tdElement.numero_dpto}</td>
                        <td>{tdElement.fecha_creacion}</td>
                        <td>$ {tdElement.precio_venta}</td>
                        <td>$ {tdElement.precio_alquiler}</td>
                        <td>{tdElement.tipo}</td>
                        <td className={styles.td_actions}>
                            <ButtonEdit handleClickEdit={handleClickEdit}></ButtonEdit>
                            <ButtonDelete id={tdElement.id_inmueble} handleClickDelete={handleClickDelete}></ButtonDelete>
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