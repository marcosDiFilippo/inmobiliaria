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
        }
    }
?>