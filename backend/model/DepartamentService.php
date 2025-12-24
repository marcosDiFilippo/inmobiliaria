<?php
    include_once("../cors.php");
    class DepartamentService {
        public function editDepartament() {
            
        }
        public function deleteDepartament () {
            $content = file_get_contents("php://input", true);
            echo $content;
        }
    }
    $departamentService = new DepartamentService();

    switch ($_SERVER["REQUEST_METHOD"]) {
        case "GET":
            break;
        case "POST":
            break;
        case "PUT":
            break;
        case "DELETE":
            $departamentService->deleteDepartament();
            break;
    }
?>