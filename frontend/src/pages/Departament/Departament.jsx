import { ButtonSubmit } from "../../components/ButtonSubmit/ButtonSubmit.jsx";
import { InputText } from "../../components/InputText/InputText.jsx";
import { Select } from "../../components/Select/Select.jsx";
import { Table } from "../../components/Table/Table";
import { Textarea } from "../../components/Textarea/Textarea.jsx";
import { useDepartament } from "../../hooks/useDepartament.jsx";
import { OPTIONS_PROPERTY_STATE, OPTIONS_PROPERTY_TYPE } from "../../constants/propertyOptions.jsx"

export function Departament () {
    function handleSubmit(event) {
        event.preventDefault()  
        const form = new FormData(event.target);
        
        console.log("form: " + form.get("name_street"))
    }

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

    const { getDataDepartament } = useDepartament();

    return (
        <>
            <h2>Departamentos</h2>
            <h3>Carga De Departamentos</h3>

            <form onSubmit={handleSubmit}>
                <div>
                    <p>Direccion:</p>
                    <InputText type={"text"} name={"name_street"} placeholder={"Ingrese el nombre de la calle"}></InputText>
                    <InputText type={"number"} name={"number_street"} placeholder={"Ingrese el numero de la calle"}></InputText>
                    <InputText type={"number"} name={"number_dpto"} placeholder={"Ingrese el numero del departamento (Opcional)"}></InputText>
                </div>
                <div>
                    <InputText type={"number"} name={"rental_price"} placeholder={"Ingrese el precio de alquiler"}></InputText>
                    <InputText type={"number"} name={"sale_price"} placeholder={"Ingrese el precio de venta"}></InputText>
                    <Select name={"property_type"} options={OPTIONS_PROPERTY_TYPE}></Select>
                </div>
                <div>
                    <Select name={"property_state"} options={OPTIONS_PROPERTY_STATE}></Select>
                </div>
                <div>
                    <Textarea name={"description"} placeholder={"Ingrese la descripcion del departamento"}></Textarea>
                </div>
                <ButtonSubmit text="Cargar Departamento"></ButtonSubmit>
            </form>

            <Table thList={thList} getData={getDataDepartament}></Table>
        </>
    )
}