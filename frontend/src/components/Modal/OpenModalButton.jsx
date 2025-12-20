import { useState } from "react";
import { Modal } from "./Modal";
import { FormProperty } from "../FormProperty/FormProperty";
import { ButtonAdd } from "../ButtonAdd/ButtonAdd";

export function OpenModalButton() {
    const [open, setOpen] = useState(false);

    function handleSubmit(event) {
        event.preventDefault()
        const form = new FormData(event.target);

        const ambients = []
        
        for (const input of event.target.querySelectorAll("input")) {
            const ambientAmount = Number(form.get(input.name));
            
            if (!input.name.includes("amount")) {
                continue
            }

            if (ambientAmount <= 0 || Number.isNaN(ambientAmount)) {
                continue
            }
            
            const ambientId = input.dataset.id;

            ambients.push({
                id: Number(ambientId),
                amount: ambientAmount
            })
        }
        
        const dataDepartament = {
            name_street: form.get("name_street"),
            number_street: Number(form.get("number_street")),
            number_dpto: Number(form.get("number_dpto")),
            rental_price:  Number(form.get("rental_price")),
            sale_price: Number(form.get("sale_price")),
            property_type: form.get("property_type"),
            property_state: form.get("property_state"),
            description: form.get("description"),
            ambients: ambients
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
    function handleClick () {
        setOpen(true)
    }
    function closeModal () {
        setOpen(false)
    }

    return (
        <>
            <ButtonAdd onClick={handleClick}>Agregar Inmueble</ButtonAdd>

            {open === false ? <></> : ( 
                <Modal title="🏠 Agregar Inmueble" onClose={closeModal}>
                    <FormProperty handleSubmit={handleSubmit}></FormProperty>
                </Modal>
            )}
        </>
    );
}
