<?php
    session_start();

    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    
    if (isset($_SESSION['user'])) {
        echo json_encode($_SESSION['user']);
        http_response_code(200);
    } 
    else {
        http_response_code(401);
        echo json_encode(['error' => 'No autenticado']);
    }
?>