import { useEffect, useState } from "react";

export function Operation () {
    const [inputs, setInputs] = useState([
        {
            id: crypto.randomUUID(),
            value: "",
            triggered: false
        }
    ])

    function handleChange (event) {
        event.preventDefault()
        const inputTarget = event.currentTarget
        
        setInputs(() => {
            const copy = []

            for (let index = 0; index < inputs.length; index++) {
                let input = inputs[index]

                if (inputs[index].id == inputTarget.id) {
                    input = {
                        id: inputTarget.id,
                        value: inputTarget.value,
                        triggered: true
                    }
                }
                copy.push(input)
            }

            return copy
        })

        const endInput = inputs.at(-1)

        if (endInput.value == "") {
            return
        }

        setInputs(() => {
            return [...inputs, {
                id: crypto.randomUUID(),
                value: "",
                triggered: false
            }]
        })
    }

    function handleSubmit (event) {
        event.preventDefault()
        console.log(inputs)
    }

    return (
        <>
            <h1>Contratos</h1>
            <form onSubmit={handleSubmit}>
                {inputs.map(inp => (
                    <input 
                        type="text"
                        name="" 
                        id={inp.id}
                        key={inp.id}
                        onChange={handleChange}
                    />
                ))}
            </form>
        </>
    )
}