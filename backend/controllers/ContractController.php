<?php
    include_once("Controller.php");
    include_once("../repository/ContractRepo.php");
    include_once("../service/ContractService.php");

    class ContractController extends Controller {
        private ContractRepo $contractRepo;
        private ContractService $contractService;
        public function __construct() {
            parent::__construct();
            $this->contractRepo = new ContractRepo();
            $this->contractService = new ContractService();       
        }

        public function createContract() {
            $dataCreated = [];

            $parts = [];

            $dataCreated["parts"] = $parts;

            try {
                $this->emptyValidation->isEmpty($_POST["operational_plan"]);
                $this->emptyValidation->isEmpty($_POST["operation_term"]);
                $this->emptyValidation->isEmpty($_POST["start_date"]);
                $this->emptyValidation->isEmpty($_POST["property"]);
                $this->emptyValidation->isEmpty($_POST["parts"]);
                $this->emptyValidation->isEmpty($_FILES["file_contract"]["name"]);
            }
            catch (Exception $e) {
                echo json_encode($e->getMessage());
                return;
            }

            $operationalPlan = (int) $_POST["operational_plan"] ?? -1;
            $operationTerm = (int) $_POST["operation_term"] ?? -1;
            $startDate = new DateTime($_POST["start_date"]) ?? "";
            $property = (int) $_POST["property"] ?? -1;
            
            $dataCreated["information"] = [
                "operationalPlan" => $operationalPlan,
                "operationTerm" => $operationTerm,
                "startDate" => $startDate,
                "property" => $property
            ];
            
            $partsDecode = json_decode($_POST["parts"], true);
            
            foreach ($partsDecode as $part) {
                $dni = $part["dni"];
                $rol = $part["rol"];

                array_push($dataCreated["parts"], [
                    "dni" => $dni,
                    "rol" => $rol
                ]);
            }
            $contract = $_FILES["file_contract"];

            $dataCreated["contract"] = $contract;   

            $this->contractService->createContract($dataCreated);
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