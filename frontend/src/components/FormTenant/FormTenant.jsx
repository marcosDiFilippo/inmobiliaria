import styles from './Form.module.css';
import { InputText } from '../InputText/InputText.jsx';
import { ButtonSubmit } from '../ButtonSubmit/ButtonSubmit.jsx';
import { useFetch } from '../../hooks/useFetch.jsx';
import { Select } from "../Select/Select.jsx"
import { useState, useEffect } from 'react';
import { InputFile } from "../InputFile/InputFile.jsx"

export function FormTenant({title, action, tenantFetch}) {
    const { dataFetch, getDataFetch } = useFetch()
    const [valueGendarme, setValueGendarme] = useState(true)
    const [dataTenant, setDataTenant] = useState({})

    useEffect(() => {
        if (action === "edit" && tenantFetch.dataFetch) {
            setDataTenant(tenantFetch.dataFetch)
        }
    }, [])  

    function handleChangeValue (event) {
        const { name, value } = event.currentTarget;
        setDataTenant({
            ...dataTenant,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)

        getDataFetch("http://localhost/inmobiliaria/backend/controllers/UserController.php"
            ,"POST"
            ,null
            ,formData)
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.grid}>
                <InputText
                    name="dni"
                    type="number"
                    placeholder="Numero de documento"
                    value={dataTenant.dni ? dataTenant.dni : ""}
                    onChange={handleChangeValue}
                />

                <InputText
                    name="phone"
                    type="number"
                    placeholder="Telefono"
                    value={dataTenant.telefono ? dataTenant.telefono : ""}
                    onChange={handleChangeValue}
                />

                <InputText
                    name="first_name"
                    placeholder="Nombre"
                    value={dataTenant.nombre ? dataTenant.nombre : ""}
                    onChange={handleChangeValue}
                />

                <InputText
                    name="last_name"
                    placeholder="Apellido"
                    value={dataTenant.apellido ? dataTenant.apellido : ""}
                    onChange={handleChangeValue}
                />

                <InputText
                    name="birth_date"
                    type="date"
                    className={styles.full}
                    value={dataTenant.fecha_nacimiento ? dataTenant.fecha_nacimiento : ""}
                    onChange={handleChangeValue}
                />

                <InputText
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={styles.full}
                    value={dataTenant.email ? dataTenant.email : ""}
                    onChange={handleChangeValue}
                />

                <div className={styles.last_div}>
                    <div>
                        <p>Es Gendarme?</p>
                        <Select name={"is_gendarme"} options={[
                            {
                                id: true,
                                name: "Si"
                            },
                            {
                                id: false,
                                name: "No"
                            }
                        ]} onChange={(event) => {
                            if (event.currentTarget.value == "false") {
                                setValueGendarme(false)
                                return
                            }
                            setValueGendarme(true)
                        }}></Select>
                    </div>
                    
                    <div className={styles.div_inputs_file}>
                        <InputFile name={"dni"} textLabel={"Subir Foto DNI"}></InputFile>
                        <InputFile name={"salary"} textLabel={"Subir Recibo Sueldo"}></InputFile>
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <ButtonSubmit text={action === "create" ? "Crear Inquilino" : "Editar Inquilino"}/>
            </div>
        </form>
    );
}