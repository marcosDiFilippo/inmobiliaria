<?php
    class MethodController {
        public function isMethodPost() : bool {
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                return true;
            }
            return false;
        }
    }
?>