import { use, useEffect, useState } from "react";
import { InputText } from "../../components/InputText/InputText.jsx";
import { Select } from "../../components/Select/Select.jsx";
import { ButtonSubmit } from "../../components/ButtonSubmit/ButtonSubmit.jsx";
import styles from "./Operation.module.css";
import { InputFile } from "../../components/InputFile/InputFile.jsx";
import { ButtonAdd } from "../../components/ButtonAdd/ButtonAdd.jsx";
import { ButtonDelete } from "../../components/ButtonDelete/ButtonDelete.jsx";
import { useFetch } from "../../hooks/useFetch.jsx";
import { TableOperation } from "../../components/Table/TableOperation.jsx";

export function Operation () {
    const [counter, setCounter] = useState(1)
    const [alert, setAlert] = useState({
        type: "",
        message: ""
    })
    const [inputs, setInputs] = useState([
        {
            id: counter,
            value: "",
            triggered: false,
            rol: 2
        }
    ])
    const [isValid, setIsValid] = useState(false)
    const [propertyOptions, setPropertyOptions] = useState([])

    const contractFetch = useFetch()

    const propetyFetch = useFetch()

    function handleClickAdd () {
        setInputs(() => {
            return [...inputs, {
                id: counter + 1,
                value: "",
                triggered: false,
                rol: 2
            }]
        })
        
        setCounter(counter + 1)
    }

    function handleClickDelete (event) {
        const idToDelete = Number(event.currentTarget.getAttribute("data-id"))

        setInputs(() => {
            return inputs.filter(inp => inp.id !== idToDelete)
        })
    }

    function handleChange (event) {
        const idToChange = Number(event.currentTarget.dataset.id)

        const value = event.currentTarget.value
        
        setInputs(() => {
            const copy = []

            inputs.forEach(inp => {
                if (inp.id === idToChange) {
                    copy.push({
                        id: inp.id,
                        value: Number(value),
                        triggered: true,
                        rol: inp.rol
                    })
                } else {
                    copy.push(inp)
                }  
            })

            return copy
        })
    }

    function handleChangeSelect (event) {
        const idToChange = Number(event.currentTarget.dataset.id)

        const value = event.currentTarget.value

        setInputs(() => {
            const copy = []

            inputs.forEach(inp => {
                if (inp.id === idToChange) {
                    copy.push({
                        id: inp.id,
                        value: inp.value,
                        triggered: inp.triggered,
                        rol: Number(value)
                    })
                } else {
                    copy.push(inp)
                }
            })

            return copy
        })
    }

    function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const parts = []

        let id = 0

        formData.forEach((value, key) => {
            let dni = 0
            let rol = 0

            if (key.startsWith("dni_") && value != "") {
                dni = value
                rol = formData.get("part_type_" + key.split("_")[1])
                id = Number(key.split("_")[1])
            }

            if (dni != 0 && rol != 0) {
                parts.push({
                    id: id,
                    dni: Number(dni),
                    rol: Number(rol)
                })
            }
            id++                        
        })

        formData.append("parts", JSON.stringify(parts))
        
        contractFetch.getDataFetch(
            "http://localhost/inmobiliaria/backend/controllers/ContractController.php",
            "POST",
            null,
            formData
        )
    }

    useEffect(() => {
        propetyFetch.getDataFetch(
            "http://localhost/inmobiliaria/backend/controllers/DepartamentController.php?action=getPropertysEmpties",
            "GET"
        ) 
        if (propetyFetch.dataFetch != null && propetyFetch.dataFetch.length == 0) {
            setIsValid(false)
        }
        else {
            setIsValid(true)
        }
    }, [])

    useEffect(() => {
        if (propetyFetch.dataFetch != null || propetyFetch.dataFetch != undefined) {
            setPropertyOptions(() => {
                const copy = []

                propetyFetch.dataFetch.forEach(property => {
                    copy.push({
                        id: property.id_inmueble,
                        name: property.calle + " " + property.numero_calle + " (" + property.numero_dpto + ")"
                    })
                })

                return copy
            })
        }
    }, [propetyFetch.dataFetch])

    useEffect(() => {
        console.log(contractFetch.dataFetch)
    }, [contractFetch.dataFetch])

    return (
        <>
            <h1>Contratos</h1>

            <h2>Ingrese el dni de las partes intevinentes</h2>
            
            {
            isValid == false 
            ? <><p>No hay propiedades disponibles - Estan todas las propiedas establecidas mediante un contrato</p></> 
            : <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className={styles.div_add_part}>   
                    <ButtonAdd onClick={handleClickAdd}>
                        Agregar Parte
                    </ButtonAdd>
                    <p className={styles.p_operation}>Propiedad:</p>
                    <Select name={"property"} options={propertyOptions}></Select>
                </div>
                <div className={styles.operation_parts}>
                    {inputs.map(inp => (
                        <div className={styles.input_group} key={inp.id}>
                            <InputText data-id={inp.id} type="number" placeholder="Ingrese el dni de la parte" name={"dni_" + inp.id} id={"dni_" + inp.id} key={inp.id} onChange={handleChange}></InputText>
                            <Select data-id={inp.id} data-select="select" name={"part_type_" + inp.id} id={"part_type_" + inp.id} options={[
                                {
                                    id: 2,
                                    name: "Inquilino"
                                },
                                {
                                    id: 3,
                                    name: "Garante"
                                }
                            ]} onChange={handleChangeSelect}></Select>
                            <ButtonDelete id={inp.id} handleClickDelete={handleClickDelete}></ButtonDelete>
                        </div>
                    ))}
                </div>
                <p className={styles.p_operation}>Elija el plan de pago y el plazo en meses de el contrato:</p>
                <div className={styles.operation_options}>
                    <Select name={"operational_plan"} options={[
                        {
                            id: 1,
                            name: "Cuatrimestral"
                        },
                        {
                            id: 2,
                            name: "Semestral"
                        },
                        {
                            id: 3,
                            name: "Anual"
                        }
                    ]}></Select>
                    <Select name={"operation_term"} options={[
                        {
                            id: 1,
                            name: 12
                        },
                        {
                            id: 2,
                            name: 24
                        },
                        {
                            id: 3,
                            name: 36
                        },
                        {
                            id: 4,
                            name: 48
                        },
                        {
                            id: 5,
                            name: 60
                        }
                    ]}></Select>
                </div>
                <div>
                    <p className={styles.p_operation}>Ingrese la fecha de inicio del contrato:</p>
                    <InputText type="date" name="start_date"></InputText>
                </div>
                <div>
                    <InputFile textLabel={"Subir Contrato"} name={"file_contract"}></InputFile>
                </div>
                <div>
                    <ButtonSubmit text="Crear Contrato"></ButtonSubmit>
                </div>
            </form>}
            
            
            <TableOperation contractData={contractFetch.dataFetch}></TableOperation>
        </>
    )
}