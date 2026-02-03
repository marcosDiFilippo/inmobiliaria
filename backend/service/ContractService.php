<?php
    include_once("UserService.php");
    include_once("../repository/ContractRepo.php");
    class ContractService {
        private UserService $userService;  
        private ContractRepo $contractRepo;

        public function __construct() {
            $this->userService = new UserService();
            $this->contractRepo = new ContractRepo();
        }

        public function createContract(array $data) {
            $connection = Database::getConnection();

            $connection->beginTransaction();

            try {
                $this->userService->verificateDniOfUsers($data["parts"]);

                $dataProperty = $this->getPropertyById($data["information"]["property"]);

                $data["dataProperty"] = $dataProperty;

                $termInMonths = $this->getTermInMonths($data["information"]["operationTerm"]);

                $endDate = $this->calculateEndDate($data["information"]["startDate"], $termInMonths);

                $data["information"]["startDate"] = $data["information"]["startDate"]->format("Y-m-d");

                $data["information"]["endDate"] = $endDate->format("Y-m-d");

                //$this->contractRepo->insertToDatabase($data);

                echo json_encode($data);

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
        public function calculateEndDate (DateTime $startDate, int $termInMonths) {
            $yearOfStartDate = (int) $startDate->format("Y");
            $monthOfStartDate = (int) $startDate->format("m");
            $dayOfStartDate = (int) $startDate->format("d");

            $yearsAmount = $yearOfStartDate + ($termInMonths / 12);

            return new DateTime("$yearsAmount-$monthOfStartDate-$dayOfStartDate");
        }
        public function getTermInMonths($id_term) {
            $connection = Database::getConnection();

            $result = $connection->query(
                "SELECT * FROM `plazo_operacion` WHERE id_plazo_operacion=$id_term"
            );

            if ($result->rowCount() == 0) {
                throw new Exception("Ocurrio un error en el registro del plazo");
            }

            $dataTerm = $result->fetch(PDO::FETCH_ASSOC);
            
            return $dataTerm["cantidad_meses"];
        }
    }
?>