<?php
    include_once("Controller.php");
    include_once("../repository/UserRepo.php");
    include_once("../validations/EmailValidation.php");
    include_once("../validations/NumberValidation.php");
    include_once("../validations/UserValidation.php");
    class UserController extends Controller {
        private UserRepo $userRepo;
        private EmailValidation $emailValidation;
        private NumberValidation $numberValidation;
        private UserValidation $userValidation;

        public function __construct()
        {
            parent::__construct();
            $this->userRepo = new UserRepo();
            $this->emailValidation = new EmailValidation();
            $this->numberValidation = new NumberValidation();
            $this->userValidation = new UserValidation();
        }

        public function getUserRepo () {
            return $this->userRepo;
        }
        public function validateUser () {
            $connection = Database::getConnection();

            $first_name  = htmlspecialchars(trim($this->requestData["first_name"]));
            $last_name   = htmlspecialchars(trim($this->requestData["last_name"]));
            $phone       = (int) trim($this->requestData["phone"]);
            $dni         = (int) trim($this->requestData["dni"]);
            $email       = htmlspecialchars(strtolower(trim($this->requestData["email"])));
            $birth_date  = htmlspecialchars(trim($this->requestData["birth_date"]));

            try {
                $this->emptyValidation->isEmpty($first_name);
                $this->emptyValidation->isEmpty($last_name);
                $this->emptyValidation->isEmpty($phone);
                $this->emptyValidation->isEmpty($dni);
                $this->emptyValidation->isEmpty($email);
                $this->emptyValidation->isEmpty($birth_date);
                $this->emailValidation->isValidEmail($email);
                $this->numberValidation->isValidNumber($phone);
                $this->numberValidation->isValidNumber($dni);

                $this->userValidation->existsUser($connection, $email, $phone, $dni);
                
                $this->userRepo->insertToDatabase($this->requestData);
            } catch (Exception $e) {
                echo json_encode($e->getMessage());
            }
        }
    }

    $userController = new UserController();
    switch($_SERVER["REQUEST_METHOD"]) {
        case "GET":
            echo json_encode($userController->getUserRepo()->getData());
            break;
        case "POST":
            $userController->validateUser();
            break;
    }
?>