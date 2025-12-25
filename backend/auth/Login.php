<?php
    session_start();

    include_once("../model/Database.php");
    class Login {
        public function authenticateUser(string $email, string $password) {
            try {
                $database = Database::getConnection();
                $query = "SELECT * FROM `admin` WHERE `email`='$email' AND `contrasenia`=MD5('$password') LIMIT 1";
                $result = $database->query($query);
                
                if ($result->rowCount() === 0) {
                    http_response_code(404);
                    return;
                }
                http_response_code(200);
                $user = $result->fetch(PDO::FETCH_ASSOC);
                
                $_SESSION["user"] = [
                    "id" => $user["id_parte_intervinente"],
                    "nombre" => $user["nombre"],
                    "apellido" => $user["apellido"]
                ];
            }
            catch (Exception $e) {
                throw new Exception("Error al autenticar el usuario: " . $e->getMessage());
            }
        }
    }
?>