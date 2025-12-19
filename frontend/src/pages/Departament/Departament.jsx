import { ButtonSubmit } from "../../components/ButtonSubmit/ButtonSubmit.jsx";
import { InputText } from "../../components/InputText/InputText.jsx";
import { Select } from "../../components/Select/Select.jsx";
import { Table } from "../../components/Table/Table";
import { Textarea } from "../../components/Textarea/Textarea.jsx";
import { useDepartament } from "../../hooks/useDepartament.jsx";
import { OPTIONS_PROPERTY_STATE, OPTIONS_PROPERTY_TYPE } from "../../constants/propertyOptions.jsx"
import { OpenModalButton } from "../../components/Modal/OpenModalButton.jsx";

export function Departament () {
    const thList = [
        {
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

    const { getDataDepartament } = useDepartament();

    return (
        <>
            <h2>Departamentos</h2>
            <h3>Carga De Departamentos</h3>

            <OpenModalButton></OpenModalButton>

            <Table thList={thList} getData={getDataDepartament}></Table>
        </>
    )
}