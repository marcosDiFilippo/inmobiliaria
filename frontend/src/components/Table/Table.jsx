import styles from "./Table.module.css"

export function Table ({thList}) {
    return (
        <table>
            <thead>
                <tr>
                    {thList.map(thElement => (  
                        <th key={thElement.id}>{thElement.field}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    )
}