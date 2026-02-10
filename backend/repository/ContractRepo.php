<?php
    include_once("Repository.php");
    class ContractRepo extends Repository {
        public function insertToDatabase (array $data) {
            $connection = Database::getConnection();

            $stmt = $connection->prepare("
                INSERT INTO operacion
                (fecha_inicio, fecha_vencimiento, precio_inicial, fk_inmueble, fk_plazo_operacion, fk_plan_operacion)
                VALUES (:start_date, :end_date, :price, :fk_property, :fk_term, :fk_plan)
            ");

            $stmt->execute([
                ":start_date" => $data["information"]["startDate"],
                ":end_date" => $data["information"]["endDate"],
                ":price" => (float) $data["dataProperty"]["rental_price"],
                ":fk_property" => $data["dataProperty"]["id_property"],
                ":fk_term" => $data["information"]["operationTerm"],
                ":fk_plan" => $data["information"]["operationalPlan"]
            ]);
        }
        public function getData()
        {
            $connection = Database::getConnection();

            $stmt = $connection->query("SELECT 
                operacion.id_operacion,
                operacion.fecha_inicio,
                operacion.fecha_vencimiento,
                operacion.precio_inicial,
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