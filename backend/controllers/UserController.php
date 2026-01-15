<?php
    include_once("Controller.php");
    include_once("../repository/UserRepo.php");
    include_once("../validations/EmailValidation.php");
    include_once("../validations/NumberValidation.php");
    include_once("../validations/UserValidation.php");
    include_once("../service/UserService.php");
    class UserController extends Controller {
        private UserRepo $userRepo;
        private EmailValidation $emailValidation;
        private NumberValidation $numberValidation;
        private UserValidation $userValidation;
        private UserService $userService;

        public function __construct()
        {
            parent::__construct();
            $this->userRepo = new UserRepo();
            $this->emailValidation = new EmailValidation();
            $this->numberValidation = new NumberValidation();
            $this->userValidation = new UserValidation();
            $this->userService = new UserService();
        }

        public function getUserRepo () {
            return $this->userRepo;
        }
        public function createUser () {
            if (!isset($_FILES)) {
                echo json_encode("Ha ocurrido un error");
                return;
            }

            $connection = Database::getConnection();

            $first_name  = htmlspecialchars(trim($_POST["first_name"]));
            $last_name   = htmlspecialchars(trim($_POST["last_name"]));
            $phone       = (int) trim($_POST["phone"]);
            $dni         = (int) trim($_POST["dni"]);
            $email       = htmlspecialchars(strtolower(trim($_POST["email"])));
            $birth_date  = htmlspecialchars(trim($_POST["birth_date"]));
            $is_gendarme = $_POST["is_gendarme"] == "true" ? true : false;

            try {
                $this->emptyValidation->isEmpty($first_name);
                $this->emptyValidation->isEmpty($last_name);
                $this->emptyValidation->isEmpty($phone);
                $this->emptyValidation->isEmpty($dni);
                $this->emptyValidation->isEmpty($email);
                $this->emptyValidation->isEmpty($birth_date);
                $this->emptyValidation->isEmpty($_FILES["dni"]["name"]);
                $this->emptyValidation->isEmpty($_FILES["salary"]["name"]);
                $this->emailValidation->isValidEmail($email);
                $this->numberValidation->isValidNumber($phone);
                $this->numberValidation->isValidNumber($dni);

                $this->userValidation->existsUser($connection, $email, $phone, $dni);
                
                $_FILES["dni"]["fk_type_document"] = 1;
                $_FILES["salary"]["fk_type_document"] = 2;

                $data = [
                    "first_name"  => $first_name,
                    "last_name"   => $last_name,
                    "phone"       => $phone,
                    "dni"         => $dni,
                    "email"       => $email,
                    "birth_date"  => $birth_date,
                    "is_gendarme" => $is_gendarme
                ];

                $this->userService->createUserWithDocuments($data, $_FILES);
            } catch (Exception $e) {
                echo json_encode($e->getMessage());
            }
        }
        public function deleteUser() {
            if (!isset($this->requestData["idUser"])) {
                echo json_encode("A ocurrido un error");
                return;
            }

            $this->userRepo->deleteUser($this->requestData["idUser"]);
        }
    }
    switch($_SERVER["REQUEST_METHOD"]) {
        case "GET":
            $userController = new UserController();

            echo json_encode($userController->getUserRepo()->getData());
            break;
        case "POST":
            $userController = new UserController();

            $userController->createUser();
            break;
        case "DELETE":
            $userController = new UserController();

            $userController->deleteUser();
            break;
    }
?>