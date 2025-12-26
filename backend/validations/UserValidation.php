<?php
    include_once("../exceptions/BusinessException.php");

    class UserValidation {

        public function existsUser(PDO $connection, string $email, int $phone, int $dni) {
            $stmt = $connection->prepare("
                SELECT 1
                FROM parte_intervinente
                WHERE email = :email
                    OR telefono = :telefono
                    OR dni = :dni
                LIMIT 1
            ");

            $stmt->execute([
                ':email' => $email,
                ':telefono' => $phone,
                ':dni' => $dni
            ]);

            if ($stmt->fetch()) {
                throw new BusinessException("El usuario ingresado ya ha sido registrado");
            }
        }
    }
?>