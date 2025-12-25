import styles from './Form.module.css';
import { InputText } from '../InputText/InputText.jsx';
import { ButtonSubmit } from '../ButtonSubmit/ButtonSubmit.jsx';
import { useFetch } from '../../hooks/useFetch.jsx';
import { useEffect } from 'react';

export function FormTenant() {
    const { dataFetch, getDataFetch } = useFetch()

    function handleSubmit(e) {
        e.preventDefault();

        const form = new FormData(e.target)

        const tenant = {
            first_name: form.get("first_name"),
            last_name: form.get("last_name"),
            phone: form.get("phone"),
            dni: form.get("dni"),
            birth_date: form.get("birth_date"),
            email: form.get("email")
        }

        getDataFetch("http://localhost/inmobiliaria/backend/controllers/UserController.php","POST",{"Content-Type":"application/json"},JSON.stringify(tenant))
    }

    useEffect(() => {
        console.log(dataFetch)
    }, [dataFetch])

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
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
            </div>

            <div className={styles.actions}>
                <ButtonSubmit text="Guardar"/>
            </div>
        </form>
    );
}