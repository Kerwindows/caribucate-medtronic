<?php
require_once __DIR__ . '/../Config/cors.php'; // ✅ Add this

session_start();
require_once __DIR__ . '/../vendor/autoload.php';

use Backend\Config\Database;

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$required = ['first_name', 'last_name', 'email', 'username', 'password', 'role'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        echo json_encode(['status' => 'error', 'message' => "Missing: $field"]);
        exit;
    }
}

try {
    $pdo = Database::connect();

    // Allow only Superadmin to register new users
    if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'superadmin') {
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? OR username = ?");
    $stmt->execute([$data['email'], $data['username']]);
    if ($stmt->rowCount()) {
        echo json_encode(['status' => 'error', 'message' => 'Email or username already exists']);
        exit;
    }

    $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("INSERT INTO users 
        (first_name, last_name, email, username, password,temp_password, role) 
        VALUES (?, ?, ?, ?, ?,?, ?)");
    $stmt->execute([
        $data['first_name'], $data['last_name'], $data['email'],
        $data['username'], $hashedPassword,$data['password'], $data['role']
    ]);

    echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
