<?php
    include_once("Repository.php");
    class UserRepo extends Repository {
        public function getData()
        {
            $connection = Database::getConnection();

            $stmt = $connection->query(
                "SELECT * FROM `parte_intervinente`");
            
            $result = $stmt->fetchAll();

            return $result;
        }   
        public function insertToDatabase ($tenant) { 
            $connection = Database::getConnection();

            //preparar el insert
            try {
                $stmtUser = $connection->prepare("INSERT INTO parte_intervinente (nombre, apellido, dni, fecha_nacimiento, email, telefono) VALUES (
                    :first_name,
                    :last_name,
                    :dni,
                    :birth_date,
                    :email,
                    :phone
                )");
                
                $stmtUser->execute([
                    ':first_name' => $tenant['first_name'],
                    ':last_name'  => $tenant['last_name'],
                    ':dni'        => $tenant['dni'],
                    ':birth_date' => $tenant['birth_date'],
                    ':email'      => $tenant['email'],
                    ':phone'      => $tenant['phone']
                ]);

                echo json_encode([
                    "succes" => true
                ]);
            } catch (Exception $e) {
                echo json_encode($e->getMessage());
            }
        }

        public function deleteUser ($idUser) {
            $connection = Database::getConnection();

            $stmtGetIdUser = $connection->prepare(
                "SELECT 1 FROM parte_intervinente WHERE id_parte_intervinente = :id"
            );
            $stmtGetIdUser->execute(['id' => $idUser]);

            if (!$stmtGetIdUser->fetch()) {
                return json_encode("No existe el id");
            }

            $stmtDelete = $connection->prepare(
                "DELETE FROM parte_intervinente WHERE id_parte_intervinente = :id"
            );
            $stmtDelete->execute(['id' => $idUser]);

            return json_encode("Usuario eliminado");
        }
    }
?>