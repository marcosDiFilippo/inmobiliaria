<?php
    include_once("UserService.php");
    class ContractService {
        private UserService $userService;  

        public function __construct() {
            $this->userService = new UserService();
        }

        public function createContract(array $data) {
            $connection = Database::getConnection();

            $connection->beginTransaction();

            try {
                $this->userService->verificateDniOfUsers($data["parts"]);

                $dataProperty = $this->getPropertyById($data["information"]["property"]);

                $data["dataProperty"] = $dataProperty;

                echo json_encode($data["dataProperty"]);

                $connection->commit();
            }
            catch (Exception $e) {
                $connection->rollBack();
                echo json_encode($e->getMessage());           
            }
        }
        public function getPropertyById ($id) {
            $connection = Database::getConnection();

            $result = $connection->query("SELECT * FROM `inmueble` WHERE id_inmueble=$id");

            if ($result->rowCount() == 0) {
                throw new Exception("Ocurrio un error al registrar la propiedad para el contrato");
            }

            $dataProperty = $result->fetch(PDO::FETCH_ASSOC);
            
            return ["id_property" => $dataProperty["id_inmueble"], "rental_price" => (int) $dataProperty["precio_alquiler"]];
        }
    }
?>