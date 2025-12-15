<?php
    include_once '../exceptions/EmptyException.php';
    class EmptyValidation {
        public function isEmpty (string $value) {
            if (empty($value)) {
                throw new EmptyException("Todos los campos son obligatorios");
            }
        }
    }
?>