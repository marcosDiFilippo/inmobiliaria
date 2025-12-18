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
            if (self::getMethodController()->isMethodPost() == false) {
                echo json_encode("Ha ocurrido un error");
                return;
            }
            try {
                $bodyRequest = file_get_contents("php://input");
            
                $data = json_decode($bodyRequest, true);

                foreach($data as $key => $element) {
                    $this->getEmptyValidation()->isEmpty($element);
                }

                $this->departamentRepo->saveToDatabase($data);
            }
            catch (Exception $e) {
                echo json_encode($e->getMessage());
            }
        }
    }
    $deapartamentRepo = new DepartamentRepo();
    $deapartamentController = new DepartamentController($deapartamentRepo);
    $deapartamentController->receiveJson();
?>