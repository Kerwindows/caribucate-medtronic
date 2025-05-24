<?php
require_once __DIR__ . '/../Config/cors.php'; // Must be before session_start

session_start();
$_SESSION = [];
session_unset();
session_destroy();

setcookie(session_name(), '', time() - 3600, '/');

echo json_encode(['status' => 'success', 'message' => 'Logged out']);
