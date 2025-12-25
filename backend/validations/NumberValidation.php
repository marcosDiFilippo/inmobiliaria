<?php
    include_once("../exceptions/NumberException.php");
    class NumberValidation {
        public function isValidNumber($value) {
            if (!is_numeric($value)) {
                throw new NumberException("Se han ingresado caracteres en campos numericos");
            }
        }
    }
?>