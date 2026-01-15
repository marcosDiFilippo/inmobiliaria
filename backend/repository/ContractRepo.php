<?php
    include_once("Repository.php");
    class ContractRepo extends Repository {
        public function insertToDatabase () {
            $connection = Database::getConnection();

            
        }
        public function getData()
        {
            $connection = Database::getConnection();

            $stmt = $connection->query("SELECT 
                operacion.id_operacion,
                operacion.fecha_inicio,
                operacion.fecha_vencimiento,
                operacion.monto_total,
                plan_operacion.nombre,
                plazo_operacion.cantidad_meses,
                locacion.calle,
                locacion.numero_calle,
                locacion.numero_dpto
            FROM operacion
            INNER JOIN inmueble 
                ON operacion.fk_inmueble = inmueble.id_inmueble
            INNER JOIN locacion 
                ON inmueble.fk_locacion = locacion.id_locacion
            INNER JOIN plazo_operacion 
                ON operacion.fk_plazo_operacion = plazo_operacion.id_plazo_operacion
            INNER JOIN plan_operacion 
                ON operacion.fk_plan_operacion = plan_operacion.id_plan_operacion;
            ");

            $result = $stmt->fetchAll();

            return $result;
        }
    }
?>