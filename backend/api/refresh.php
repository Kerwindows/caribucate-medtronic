<?php
require_once __DIR__ . '/../Config/cors.php'; // Must be before session_start
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
    echo json_encode([
        "status" => "success",
        "user" => $_SESSION['user']
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Not authenticated"]);
}
