import styles from './Form.module.css';
import { InputText } from '../InputText/InputText.jsx';
import { ButtonSubmit } from '../ButtonSubmit/ButtonSubmit.jsx';
import { useFetch } from '../../hooks/useFetch.jsx';
import { Select } from "../Select/Select.jsx"
import { useState, useEffect } from 'react';
import { InputFile } from "../InputFile/InputFile.jsx"

export function FormTenant() {
    const { dataFetch, getDataFetch } = useFetch()
    const [valueGendarme, setValueGendarme] = useState(true)

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)

        getDataFetch("http://localhost/inmobiliaria/backend/controllers/UserController.php"
            ,"POST"
            ,null
            ,formData)
    }

    useEffect(() => {
        console.log(dataFetch)
    }, [dataFetch])

    return (
        <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
            <h2 className={styles.title}>Agregar Inquilino</h2>

            <div className={styles.grid}>
                <InputText
                    name="dni"
                    type="number"
                    placeholder="Numero de documento"
                />

                <InputText
                    name="phone"
                    type="number"
                    placeholder="Telefono"
                />

                <InputText
                    name="first_name"
                    placeholder="Nombre"
                />

                <InputText
                    name="last_name"
                    placeholder="Apellido"
                />

                <InputText
                    name="birth_date"
                    type="date"
                    className={styles.full}
                />

                <InputText
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={styles.full}
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
                <ButtonSubmit text="Guardar"/>
            </div>
        </form>
    );
}