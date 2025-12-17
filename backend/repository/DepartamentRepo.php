<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    include_once("./Repository.php");
    include_once("../model/Database.php");
    class DepartamentRepo extends Repository {
        public function getData()
        {
            $connection = Database::getConnection();

            $stmt = $connection->query(
                "SELECT 
                            id_inmueble,
                            calle,
                            numero_dpto,
                            fecha_creacion,
                            precio_venta,
                            precio_alquiler,
                            descripcion,
                            tipo
                        FROM `inmueble`
                        INNER JOIN locacion ON inmueble.fk_locacion = locacion.id_locacion
                        INNER JOIN tipo_inmueble ON inmueble.fk_tipo_inmueble = tipo_inmueble.id_tipo_inmueble
                        INNER JOIN estado_inmueble ON inmueble.fk_estado_inmueble = estado_inmueble.id_estado_inmueble;");
            
            $result = $stmt->fetchAll();

            echo json_encode($result);
        }
    }
    
    $deapartamentRepo = new DepartamentRepo();
    $deapartamentRepo->getData();
?>