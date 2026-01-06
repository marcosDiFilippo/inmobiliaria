<?php
    class ContractRepo {
        public function insertToDatabase () {
            $connection = Database::getConnection();

            $connection->beginTransaction();

            
        }
    }
?>