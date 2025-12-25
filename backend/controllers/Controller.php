<?php
    include_once("../validations/EmptyValidation.php");
    include_once("./MethodController.php");
    abstract class Controller {
        protected EmptyValidation $emptyValidation;
        protected MethodController $methodController;
        protected array $requestData;
        public function __construct()
        {
            $json = file_get_contents("php://input");
            $this->requestData = json_decode($json, true) ?? [];
            $this->emptyValidation = new EmptyValidation();
            $this->methodController = new MethodController();
        }
        public function getEmptyValidation(): EmptyValidation
        {
            return $this->emptyValidation;
        }
        public function getMethodController () {
            return $this->methodController;
        }
        public function getRequestData () {
            return $this->requestData;
        }
    }
?>