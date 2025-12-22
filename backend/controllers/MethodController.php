<?php

    include_once("../model/MethodControllerInterface.php");
    class MethodController implements MethodControllerInterface {
        public function isMethodPost() : bool {
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                return true;
            }
            return false;
        }
    }
?>