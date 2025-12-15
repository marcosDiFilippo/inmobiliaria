<?php
    abstract class Controller {
        private EmptyValidation $emptyValidation;

        public function __construct()
        {
            $this->emptyValidation = new EmptyValidation();
        }

        public function getEmptyValidation(): EmptyValidation
        {
            return $this->emptyValidation;
        }
    }
?>