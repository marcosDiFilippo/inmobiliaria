import { use, useEffect, useState } from "react"
import styles from "./Table.module.css"
import { useFetch } from "../../hooks/useFetch"
import { ButtonDetails } from "../ButtonDetails/ButtonDetails"

export function TableOperation () {
    const operationsFetch = useFetch()
    const [dataTable, setDataTable] = useState([])

    useEffect(() => {
        operationsFetch.getDataFetch("http://localhost/inmobiliaria/backend/controllers/ContractController.php", "GET")
    }, [])

    useEffect(() => {
        if (operationsFetch.dataFetch != null) {
            setDataTable(() => {
                const copy = []

                operationsFetch.dataFetch.forEach(op => {
                    copy.push(op)
                });

                return copy
            })
        }
    }, [operationsFetch.dataFetch])

    function handleClickDetails () {

    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>
                            Direccion
                        </th>
                        <th>
                            Fecha Inicio
                        </th>
                        <th>
                            Fecha Vencimiento
                        </th>
                        <th>
                            Monto Inicio
                        </th>
                        <th>
                            Plazo
                        </th>
                        <th>
                            Plan Efectuado
                        </th>
                        <th>
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {dataTable.map(operation => (
                        operation == null ? <></> : 
                        <tr key={operation.id_operacion}>
                            <td>
                                {operation.calle + " " + operation.numero_calle + " " + operation.numero_dpto}
                            </td>
                            <td>{operation.fecha_inicio}</td>
                            <td>{operation.fecha_vencimiento}</td>
                            <td>$ {operation.monto_total}</td>
                            <td>{operation.cantidad_meses} meses</td>
                            <td>{operation.nombre}</td>
                            <td>
                                <ButtonDetails onClick={handleClickDetails} id={operation.id_operacion}>Ver Detalles</ButtonDetails>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}