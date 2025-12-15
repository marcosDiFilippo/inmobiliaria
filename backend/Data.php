<?php
    include_once("model/Database.php");
/*
    spl_autoload_register(function ($class) {
        $path = __DIR__ . 'model/' . str_replace('\\', '/', $class) . '.php';
        require_once $path;
    });
    */

    //evitar problemas de CORS
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    $connection = Database::getConnection();

    $stmt = $connection->query("SELECT * FROM `parte_intervinente`");
    
    $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo $datos[0]["nombre"] . " " . $datos[0]["apellido"];
?>  