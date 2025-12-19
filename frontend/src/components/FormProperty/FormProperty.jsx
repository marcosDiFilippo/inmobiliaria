import { OPTIONS_PROPERTY_STATE, OPTIONS_PROPERTY_TYPE } from "../../constants/propertyOptions";
import { ButtonSubmit } from "../ButtonSubmit/ButtonSubmit";
import { InputText } from "../InputText/InputText";
import { Select } from "../Select/Select";
import { Textarea } from "../Textarea/Textarea";
import styles from "./Form.module.css"

export function FormProperty ({handleSubmit}) {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <p>Direccion:</p>
                    <InputText type={"text"} name={"name_street"} placeholder={"Ingrese el nombre de la calle"}></InputText>
                    <InputText type={"number"} name={"number_street"} placeholder={"Ingrese el numero de la calle"}></InputText>
                    <InputText type={"number"} name={"number_dpto"} placeholder={"Ingrese el numero del departamento (Opcional)"}></InputText>
                </div>
                <div>
                    <p>Precios:</p>
                    <InputText type={"number"} name={"rental_price"} placeholder={"Ingrese el precio de alquiler"}></InputText>
                    <InputText type={"number"} name={"sale_price"} placeholder={"Ingrese el precio de venta"}></InputText>
                </div>
                <div>
                    <p>Categorias:</p>
                    <div className={styles.div_categories}>
                        <Select name={"property_type"} options={OPTIONS_PROPERTY_TYPE}></Select>
                        <Select name={"property_state"} options={OPTIONS_PROPERTY_STATE}></Select>
                    </div>
                </div>
                <div>
                    <p>Descripcion del inmueble:</p>
                    <Textarea name={"description"} placeholder={"Ingrese la descripcion del departamento"}></Textarea>
                </div>
                <ButtonSubmit text="Cargar Departamento"></ButtonSubmit>
            </div>
            <div className={styles.line}></div>
            <div className={styles.div_ambients}>
                <p>Ambientes</p>
                <InputText name="toilets_amount" placeholder="Cantidad de baños"></InputText>
                <InputText name="kitchen_amount" placeholder="Cantidad de cocinas"></InputText>
                <InputText name="garage_amount" placeholder="Cantidad de cocheras"></InputText>
                <InputText name="living_amount" placeholder="Cantidad de livings"></InputText>
                <InputText name="yard_amount" placeholder="Cantidad de patios"></InputText>
                <InputText name="terrace_amount" placeholder="Cantidad de terrazas"></InputText>
            </div>
        </form>
    )
}