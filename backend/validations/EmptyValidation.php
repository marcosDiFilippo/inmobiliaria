<?php
    include_once '../exceptions/EmptyException.php';
    class EmptyValidation {
        public function isEmpty ($value) {
            if (empty($value) or $value == null) {
                throw new EmptyException("Todos los campos son obligatorios");
            }
        }
    }
?>