import { ButtonSubmit } from "../../components/ButtonSubmit/ButtonSubmit.jsx";
import { InputText } from "../../components/InputText/InputText.jsx";
import { Select } from "../../components/Select/Select.jsx";
import { Table } from "../../components/Table/Table";
import { Textarea } from "../../components/Textarea/Textarea.jsx";
import { useDepartament } from "../../hooks/useDepartament.jsx";
import { OPTIONS_PROPERTY_STATE, OPTIONS_PROPERTY_TYPE } from "../../constants/propertyOptions.jsx"

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

    function handleSubmit(event) {
        event.preventDefault()  
        const form = new FormData(event.target);

        const dataDepartament = {
            name_street: form.get("name_street"),
            number_street: Number(form.get("number_street")),
            number_dpto: Number(form.get("number_dpto")),
            rental_price:  Number(form.get("rental_price")),
            sale_price: Number(form.get("sale_price")),
            property_type: form.get("property_type"),
            property_state: form.get("property_state"),
            description: form.get("description"),
        };

        fetchInsertDepartament(dataDepartament)
    }
    
    async function fetchInsertDepartament(dataDepartament) {
        let response = await fetch("http://localhost/inmobiliaria/backend/controllers/DepartamentController.php",
            {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(dataDepartament)
            }
        )

        let text = await response.text()

        console.log(text)
    }

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