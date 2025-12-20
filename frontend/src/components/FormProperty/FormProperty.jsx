import { OPTIONS_PROPERTY_STATE, OPTIONS_PROPERTY_TYPE } from "../../constants/propertyOptions";
import { ButtonSubmit } from "../ButtonSubmit/ButtonSubmit";
import { InputText } from "../InputText/InputText";
import { Select } from "../Select/Select";
import { Textarea } from "../Textarea/Textarea";
import styles from "./Form.module.css"

export function FormProperty ({handleSubmit}) {
    return (
        <form onSubmit={handleSubmit} className={styles.form_departament}>
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
                    <div className={styles.p_categories}>
                        <p>Tipo de inmueble | Estado del inmueble</p>
                    </div>
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
                <div>
                    <InputText type="number" data-id={1} name="kitchen_amount" placeholder="Cantidad de cocinas"></InputText>
                    <InputText type="number" data-id={2} name="toilets_amount" placeholder="Cantidad de baños"></InputText>
                    <InputText type="number" data-id={3} name="garage_amount" placeholder="Cantidad de cocheras"></InputText>
                    <InputText type="number" data-id={4} name="room_amount" placeholder="Cantidad de habitaciones"></InputText>
                    <InputText type="number" data-id={5} name="living_amount" placeholder="Cantidad de livings"></InputText>
                    <InputText type="number" data-id={6} name="yard_amount" placeholder="Cantidad de patios"></InputText>
                    <InputText type="number" data-id={7} name="terrace_amount" placeholder="Cantidad de terrazas"></InputText>
                    <InputText type="number" data-id={8} name="grill_amount" placeholder="Cantidad de parrillas"></InputText>
                    <InputText type="number" data-id={9} name="balcony_amount" placeholder="Cantidad de balcones"></InputText>
                    <InputText type="number" data-id={10} name="dining_room_amount" placeholder="Cantidad de comedores"></InputText>
                    <InputText type="number" data-id={11} name="laundry_amount" placeholder="Cantidad de lavaderos"></InputText>
                </div>
            </div>  
        </form>
    )
}