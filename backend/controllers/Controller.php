<?php
    include_once("../validations/EmptyValidation.php");
    include_once("./MethodController.php");
    abstract class Controller {
        private EmptyValidation $emptyValidation;
        private MethodController $methodController;
        public function __construct()
        {
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
    }
?>