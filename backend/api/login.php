<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../Config/cors.php'; // ✅ Add this

session_start();


use Backend\Config\Database;


header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
if (empty($data['username']) || empty($data['password'])) {
    echo json_encode(['status' => 'error', 'message' => 'Username and password required']);
    exit;
}

try {
    $pdo = Database::connect();
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$data['username']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($data['password'], $user['password'])) {
        unset($user['password']);
        unset($user['temp_password']);
        $_SESSION['user'] = $user;
        echo json_encode(['status' => 'success', 'user' => $user]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
