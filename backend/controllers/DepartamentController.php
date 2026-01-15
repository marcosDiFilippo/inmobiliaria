<?php
    include_once("../repository/DepartamentRepo.php");
    include_once("./Controller.php");
    class DepartamentController extends Controller {
        private DepartamentRepo $departamentRepo;
        public function __construct()
        {
            parent::__construct();
            $this->departamentRepo = new DepartamentRepo();
        }
        public function receiveJson () {
            if ($this->methodController->isMethodPost() == false) {
                return;
            }
            try {
                $this->emptyValidation->isEmpty($this->requestData["name_street"]);
                $this->emptyValidation->isEmpty($this->requestData["number_street"]);
                $this->emptyValidation->isEmpty($this->requestData["number_dpto"]);
                $this->emptyValidation->isEmpty($this->requestData["rental_price"]);
                $this->emptyValidation->isEmpty($this->requestData["sale_price"]);
                $this->emptyValidation->isEmpty($this->requestData["property_type"]);
                $this->emptyValidation->isEmpty($this->requestData["property_state"]);
                $this->emptyValidation->isEmpty($this->requestData["description"]);
                
                $ambients = $this->requestData["ambients"];
                
                $this->departamentRepo->saveToDatabase($this->requestData, $ambients);
            }
            catch (Exception $e) {
                echo json_encode($e->getMessage());
            }
        }
        public function deleteDepartament () {
            if (!isset($this->requestData["idInmueble"])) {
                http_response_code(400);
                echo json_encode(["error" => "idInmueble faltante"]);
                return;
            }

            $idProperty = (int) $this->requestData["idInmueble"];
            $this->departamentRepo->deleteFromDatabase($idProperty);
        }
        public function getDepartamentRepo () {
            return $this->departamentRepo;
        }
    }
    switch ($_SERVER["REQUEST_METHOD"]) {
        case "GET":
            $deapartamentController = new DepartamentController();
            if (isset($_GET["action"]) == "getPropertysEmpties") {
                echo json_encode($deapartamentController->getDepartamentRepo()->getPropertyesEmpties());
                break;
            }
            
            echo json_encode($deapartamentController->getDepartamentRepo()->getData());
            break;
        case "POST":
            $deapartamentController = new DepartamentController();

            $deapartamentController->receiveJson();
            break;
        case "DELETE":
            $deapartamentController = new DepartamentController();

            $deapartamentController->deleteDepartament();
            break;
        default:
            http_response_code(405);
            echo json_encode("Método no permitido");
            
            break;
    }
?>