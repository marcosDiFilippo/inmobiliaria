<?php 
    include_once("../cors.php");
    include_once '../validations/EmptyValidation.php';
    include_once '../validations/EmailValidation.php';
    include_once '../auth/Login.php';
    include_once './Controller.php';

    class LoginController extends Controller {
        private Login $login;
        private string $email;
        private string $password;
        private EmailValidation $emailValidation;
        public function __construct(string $email, string $password)
        {
            parent::__construct();
            $this->login = new Login();
            $this->emailValidation = new EmailValidation();
            $this->email = $email;
            $this->password = $password;
        }
        public function loginUser() {
            try {
                $this->getEmptyValidation()->isEmpty($this->email);
                $this->getEmptyValidation()->isEmpty($this->password);
                $this->emailValidation->isValidEmail($this->email);
                
                $this->login->authenticateUser($this->email, $this->password);
            } catch (EmptyException $e) {
                throw new EmptyException($e->getMessage());
            } catch (InvalidEmailException $e) {
                throw new InvalidEmailException($e->getMessage());
            }
        }
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $loginController = new LoginController(htmlspecialchars($_POST['email']), htmlspecialchars($_POST['password']));
        $loginController->loginUser();
    }
?>