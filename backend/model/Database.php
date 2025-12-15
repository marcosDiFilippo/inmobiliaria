<?php
    class Database {
        private static ? PDO $connection = null;
        public static function getConnection(): PDO {
            if (self::$connection === null) {
                self::$connection = new PDO("mysql:host=localhost;dbname=inmobiliaria;charset=utf8mb4",
                                            "root",
                                            "",
                                            [
                                                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                                                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                                                PDO::ATTR_EMULATE_PREPARES => false
                                            ]);
            }
            return self::$connection;
        }
    }
?>