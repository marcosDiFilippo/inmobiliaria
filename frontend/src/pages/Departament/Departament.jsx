import { Table } from "../../components/Table/Table";

export function Departament () {
    const thList = [{
        id: 1,
        field: "Ubicacion"
    },
    {
        id: 2,
        field: "Fecha De Creacion"
    },
    {
        id: 3,
        field: "Precio Venta"
    },
    {
        id: 4,
        field: "Precio Alquiler"
    },
    {
        id: 5,
        field: "Descripcion"
    },
    {
        id: 6,
        field: "Tipo Inmueble"
    },
    {
        id: 7,
        field: "Estado"
    },
]

    return (
        <>
            <h2>Departamentos</h2>

            <Table thList={thList}></Table>
        </>
    )
}