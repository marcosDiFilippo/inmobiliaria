import { FormTenant } from "../../components/FormTenant/FormTenant";
import { TableTenant } from "../../components/Table/TableTenant";
import { useUsers } from "../../hooks/useUsers";

export function Tenant () {
    const { getDataUsers } = useUsers()

    const thList = [
        {
            id: 1,
            field: "ID"
        },
        {
            id: 2,
            field: "Nombre Completo"
        },
        {
            id: 3,
            field: "Fecha Nacimiento"
        },
        {
            id: 4,
            field: "Dni"
        },
        {
            id: 5,
            field: "Email"
        },
        {
            id: 6,
            field: "Acciones"
        },
        {
            id: 7,
            field: "Detalles"
        }
    ]

    return (
        <>
            <h2>Inquilinos - Locatarios</h2>

            <FormTenant></FormTenant>

            <TableTenant getDataUsers={getDataUsers} thList={thList}></TableTenant>
        </>
    )
}