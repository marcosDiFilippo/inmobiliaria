<?php
    include_once("Controller.php");
    include_once("../repository/ContractRepo.php");

    class ContractController extends Controller {
        private ContractRepo $contractRepo;
        public function __construct() {
            $this->contractRepo = new ContractRepo();
            parent::__construct();
        }

        public function createContract() {
            $dataCreated = [];

            $parts = [];

            array_push($dataCreated, $parts);

            $operationalPlan = (int) $_POST["operational_plan"] ?? -1;
            $operationTerm = (int) $_POST["operation_term"] ?? -1;
            $startDate = $_POST["start_date"] ?? "";
            $property = (int) $_POST["property"] ?? -1;
            
            array_push($dataCreated, [
                "operationalPlan" => $operationalPlan,
                "operationTerm" => $operationTerm,
                "startDate" => $startDate,
                "property" => $property
            ]);
            
            $partsDecode = json_decode($_POST["parts"], true);
            
            foreach ($partsDecode as $part) {
                $dni = $part["dni"];
                $rol = $part["rol"];

                array_push($dataCreated[0], [
                    "dni" => $dni,
                    "rol" => $rol
                ]);
            }

            $contract = null;

            if (isset($_FILES["file_contract"])) {
                $contract = $_FILES["file_contract"];
            }

            array_push($dataCreated, $contract);
            
            echo json_encode($dataCreated);
        }

        public function getContractRepo () {
            return $this->contractRepo;
        }
    }
    switch ($_SERVER["REQUEST_METHOD"]) {
        case "GET":
            $contractController = new ContractController();
            
            echo json_encode($contractController->getContractRepo()->getData());
            break;
        case "POST":
            $contractController = new ContractController();

            $contractController->createContract();
            break;
        default:
            http_response_code(405);
            echo json_encode("Método no permitido");
            break;
    }
?>