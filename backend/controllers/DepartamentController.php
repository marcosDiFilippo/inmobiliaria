<?php
    include_once("../cors.php");
    include_once("./Controller.php");
    include_once("../repository/DepartamentRepo.php");
    class DepartamentController extends Controller {
        private DepartamentRepo $departamentRepo;
        public function __construct(DepartamentRepo $departamentRepo)
        {
            parent::__construct();
            $this->departamentRepo = $departamentRepo;
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
    }
    $deapartamentController = new DepartamentController($deapartamentRepo);
    $deapartamentController->receiveJson();
?>