<?php
    include_once '../exceptions/InvalidEmailException.php';
    class EmailValidation {
        public function isValidEmail (string $email) {
            if (!str_contains($email, '@')) {
                throw new InvalidEmailException("El correo electrónico no es válido");
            }
        }
    }
?>