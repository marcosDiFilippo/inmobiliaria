import { use, useEffect } from "react";
import { FormTenant } from "../../components/FormTenant/FormTenant";
import { useFetch } from "../../hooks/useFetch";
import Loading from "../../components/Loading/Loading";

export function TenantEdit () {
    const tenantFetch = useFetch()

    useEffect(() => {
        const idOfTenant = window.location.pathname.at(-1)

        tenantFetch.getDataFetch("http://localhost/inmobiliaria/backend/controllers/UserController.php?idUser=" + idOfTenant + "&action=getUserById","GET",{"Content-Type":"application/json"})
    }, [])

    return (
        <>
            {tenantFetch.dataFetch != null ? <FormTenant title={"Editar Inquilino"} action={"edit"} tenantFetch={tenantFetch}></FormTenant> : <Loading></Loading>}
        </>
    )
}