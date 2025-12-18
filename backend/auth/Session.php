<?php
    session_start();

    include_once("../cors.php");
    
    if (isset($_SESSION['user'])) {
        echo json_encode($_SESSION['user']);
        http_response_code(200);
    } 
    else {
        http_response_code(401);
        echo json_encode(['error' => 'No autenticado']);
    }
?>