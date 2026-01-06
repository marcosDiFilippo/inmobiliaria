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

            $operationalPlan = $_POST["operational_plan"] ?? "";
            $operationTerm = $_POST["operation_term"] ?? "";
            $startDate = $_POST["start_date"] ?? "";

            array_push($dataCreated, [
                "operationalPlan" => $operationalPlan,
                "operationTerm" => $operationTerm,
                "startDate" => $startDate
            ]);

            $keysFiles = array_keys($_FILES);

            $uploadedFiles = [];

            foreach ($keysFiles as $key) {
                $currentKey = explode("_", $key);   

                $_FILES[$key]["dni"] = $currentKey[2];
                $_FILES[$key]["type_document"] = $currentKey[1];

                array_push($uploadedFiles, $_FILES[$key]);
            }

            $parts = [];

            $operationalPlan = "";
            $operationTerm = "";
            $startDate = "";

            $parts = json_decode($_POST["parts"], true);

            foreach ($parts as $part) {
                $dni = $part["dni"];
                $rol = $part["rol"];
                $documents = [];

                for ($i = count($uploadedFiles) - 1; $i >= 0; $i--) {
                    if ($uploadedFiles[$i]["dni"] == $dni) {

                        $documents[] = [
                            "type_document" => $uploadedFiles[$i]["type_document"],
                            "name" => $uploadedFiles[$i]["name"],
                            "tmp_name" => $uploadedFiles[$i]["tmp_name"],
                            "size" => $uploadedFiles[$i]["size"],
                            "error" => $uploadedFiles[$i]["error"]
                        ];
                        
                        array_splice($uploadedFiles, $i, 1);
                    }
                }

                array_push($dataCreated, [
                    "dni" => $dni,
                    "rol" => $rol,
                    "documents" => $documents
                ]);
            }

            //$this->contractRepo->insertToDatabase();
            
            echo json_encode($dataCreated);
            /*
            try {
                
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode("Error al crear el contrato: " . $e->getMessage());
            }
            */
        }
    }
    switch ($_SERVER["REQUEST_METHOD"]) {
        case "GET":
            $contractController = new ContractController();
            
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