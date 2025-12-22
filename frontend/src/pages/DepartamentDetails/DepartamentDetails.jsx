import { useEffect, useState } from "react";
import { useDepartamentDetails } from "../../hooks/useDepartamentDetails";
import styles from "./Departament.module.css"

export function DepartamentDetails () {
    const [details, setDetails] = useState("")
    const params = new URLSearchParams(window.location.search)
    const id_inmueble = params.get("idInmueble")

    const { getDepartamentDetails, result } = useDepartamentDetails();

    useEffect(() => {
        getDepartamentDetails(id_inmueble, setDetails)
    }, [])

    if (result == null) return <p>Cargando...</p> 

    const property = result.dataProperty[0];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Detalles del inmueble 🏠</h1>

            {/* Datos principales */}
            <div className={styles.card}>
                <div className={styles.grid}>
                    <div className={styles.item}>
                        <span className={styles.label}>Calle</span>
                        <span className={styles.value}>{property.calle}</span>
                    </div>

                    <div className={styles.item}>
                        <span className={styles.label}>Departamento</span>
                        <span className={styles.value}>{property.numero_dpto}</span>
                    </div>

                    <div className={styles.item}>
                        <span className={styles.label}>Tipo</span>
                        <span className={styles.value}>{property.tipo}</span>
                    </div>

                    <div className={styles.item}>
                        <span className={styles.label}>Estado</span>
                        <span className={styles.value}>{property.estado}</span>
                    </div>

                    <div className={styles.item}>
                        <span className={styles.label}>Precio alquiler</span>
                        <span className={styles.value}>${property.precio_alquiler}</span>
                    </div>

                    <div className={styles.item}>
                        <span className={styles.label}>Precio venta</span>
                        <span className={styles.value}>${property.precio_venta}</span>
                    </div>
                </div>
            </div>

            {/* Ambientes */}
            {result.dataAmbients.length === 0 ? <h2>Este inmueble no tiene ambientes cargados</h2> : 
                <div className={styles.card}>
                    <h2 className={styles.title}>Ambientes - Cantidad</h2>
                    <div className={styles.ambients}>
                        { 
                            result.dataAmbients.map((amb, index) => (
                                <div key={index} className={styles.ambient}>
                                    <span>{amb.nombre == "Banio" ? amb.nombre = "Baños": amb.nombre}</span>
                                    <strong>{amb.cantidad_ambientes}</strong>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    );
}