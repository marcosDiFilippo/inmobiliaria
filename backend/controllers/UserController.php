<?php
    include_once("Controller.php");
    include_once("../repository/UserRepo.php");
    include_once("../validations/EmailValidation.php");
    include_once("../validations/NumberValidation.php");
    class UserController extends Controller {
        private UserRepo $userRepo;
        private EmailValidation $emailValidation;
        private NumberValidation $numberValidation;

        public function __construct()
        {
            parent::__construct();
            $this->userRepo = new UserRepo();
            $this->emailValidation = new EmailValidation();
            $this->numberValidation = new NumberValidation();
        }

        public function getUserRepo () {
            return $this->userRepo;
        }
        public function validateUser () {
            $first_name = htmlspecialchars($this->requestData["first_name"]);
            $last_name = htmlspecialchars($this->requestData["last_name"]);
            $phone = htmlspecialchars($this->requestData["phone"]);
            $dni = htmlspecialchars($this->requestData["dni"]);
            $email = htmlspecialchars($this->requestData["email"]);
            $birth_date = htmlspecialchars($this->requestData["first_name"]);

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

                $this->userRepo->insertToDatabase($this->requestData);
            } catch (Exception $e) {
                echo json_encode($e->getMessage());
            }

            echo json_encode("todo bien");
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