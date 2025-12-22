<?php 
    include_once("../model/Database.php");
    include_once("../controllers/MethodController.php");
    class DepartamentDetails {
        private MethodController $methodController;

        public function __construct()
        {
            $this->methodController = new MethodController();
        }
        public function getDepartamentDetails () {
            if ($this->methodController->isMethodPost() == false) {
                exit();
            }
            if (!isset($_POST["idInmueble"])) {
                exit();
            }
            $idInmueble = (int) $_POST["idInmueble"];

            $connection = Database::getConnection();
            
            $stmtProperty = $connection->query(
                "SELECT 
                            id_inmueble,
                            calle,
                            numero_dpto,
                            fecha_creacion,
                            precio_venta,
                            precio_alquiler,
                            descripcion,
                            tipo,
                            estado
                        FROM `inmueble`
                        INNER JOIN locacion ON inmueble.fk_locacion = locacion.id_locacion
                        INNER JOIN tipo_inmueble ON inmueble.fk_tipo_inmueble = tipo_inmueble.id_tipo_inmueble
                        INNER JOIN estado_inmueble ON inmueble.fk_estado_inmueble = estado_inmueble.id_estado_inmueble
                        WHERE id_inmueble=$idInmueble
                        ;");

            $dataProperty = $stmtProperty->fetchAll();

            $stmtAmbients = $connection->query(
                        "SELECT nombre, cantidad_ambientes FROM inmueble_ambiente
                                INNER JOIN ambiente ON ambiente.id_ambiente = inmueble_ambiente.fk_ambientes
                                WHERE inmueble_ambiente.fk_inmueble = $idInmueble
                            ;");

            $dataAmbients = $stmtAmbients->fetchAll();

            $response = [
                "dataProperty" => $dataProperty,
                "dataAmbients" => $dataAmbients
            ];
            echo json_encode($response);        
        }
    }
    $departamentDetails = new DepartamentDetails();
    $departamentDetails->getDepartamentDetails();
?>