<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    session_start();
    
    if (isset($_SESSION['user'])) {
        echo json_encode($_SESSION['user']);
    } 
    else {
        http_response_code(401);
        echo json_encode(['error' => 'No autenticado']);
    }
?>