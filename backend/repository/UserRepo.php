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
        public function createUser (string $dataTenant) { 
            $connection = Database::getConnection();

            $tenant = json_decode($dataTenant, TRUE);
            
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

            $id_part = $connection->lastInsertId();

            return [
                "id_part" => $id_part,
                "dni" => $tenant["dni"]
            ];
        }
        public function insertDocumentsFromUser (array $dataPart, array $files) {
            $connection = Database::getConnection();

            $stmt = $connection->prepare("INSERT INTO `documentacion_parte`
            (`fk_tipo_documento`, `fk_parte_intervinente`, `documento`) 
            VALUES 
            (
            :fk_type_document
            ,:fk_part
            ,:document)"
            );

            $stmt->execute([
                ":fk_type_document" => $files["dni"]["fk_type_document"],
                ":fk_part" => $dataPart["id_part"],
                ":document" => $files["dni"]["hash"]
            ]);

            $stmt->execute([
                ":fk_type_document" => $files["salary"]["fk_type_document"],
                ":fk_part" => $dataPart["id_part"],
                ":document" => $files["salary"]["hash"]
            ]);
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