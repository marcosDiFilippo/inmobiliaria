import { Table } from "../../components/Table/Table";
import { useDepartament } from "../../hooks/useDepartament.jsx";
import { OpenModalButton } from "../../components/Modal/OpenModalButton.jsx";
import { Carousel } from "../../components/Carousel/Carousel.jsx";
import { useState } from "react";

export function Departament ({navigateTo}) {
    const [alert, setAlert] = useState(<></>)   

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
            field: "Tipo Inmueble"
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

    const { getDataDepartament } = useDepartament();

    return (
        <>
            <h2>Departamentos</h2>
            <h3>Carga De Departamentos</h3>

            <OpenModalButton></OpenModalButton>

            {alert}
            <Table thList={thList} getData={getDataDepartament} navigateTo={navigateTo} setAlert={setAlert}></Table>
            {/*<Carousel></Carousel>*/}
        </>
    )
}