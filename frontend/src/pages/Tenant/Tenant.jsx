import { FormTenant } from "../../components/FormTenant/FormTenant";
import { TableTenant } from "../../components/Table/TableTenant";
import { useUsers } from "../../hooks/useUsers";

export function Tenant ({navigateTo}) {
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
            field: "Telefono"
        },
        {
            id: 5,
            field: "Dni"
        },
        {
            id: 6,
            field: "Email"
        },
        {
            id: 7,
            field: "Acciones"
        },
        {
            id: 8,
            field: "Detalles"
        }
    ]

    return (
        <>
            <FormTenant title={"Agregar Inquilino"} action={"create"} tenantFetch={null}></FormTenant>

            <TableTenant getDataUsers={getDataUsers} thList={thList} navigateTo={navigateTo}></TableTenant>
        </>
    )
}