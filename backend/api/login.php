<?php
// Debug helpers — show all errors in the response
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// 1) Autoload Composer packages and load .env
require_once __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->safeLoad();

// 2) Emit CORS headers (and exit on OPTIONS)
require_once __DIR__ . '/cors.php';

// 3) Ensure JSON response
header('Content-Type: application/json');

use Firebase\JWT\JWT;
use Backend\Config\Database;

// 4) Read request body
$data = json_decode(file_get_contents('php://input'), true);
if (empty($data['email']) || empty($data['password'])) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Email and password required']));
}

try {
    // 5) Lookup user
    $pdo = Database::connect();
    $stmt = $pdo->prepare(
        "SELECT id, email, password, first_name, last_name, role FROM users WHERE email = ?"
    );
    $stmt->execute([$data['email']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($data['password'], $user['password'])) {
        http_response_code(401);
        exit(json_encode(['status' => 'error', 'message' => 'Invalid credentials']));
    }

    // 6) Remove sensitive data
    unset($user['password']);

    // 7) Build JWT payload
    $now = time();
    $exp = $now + 3600; // expires in 1 hour
    $payload = [
        'iat'   => $now,
        'exp'   => $exp,
        'sub'   => $user['id'],
        'email' => $user['email'],
        'role'  => $user['role'],
    ];

    // 8) Encode JWT using secret from .env
    $secret = $_ENV['JWT_SECRET'] ?? die('JWT_SECRET not set');
    $jwt = JWT::encode($payload, $secret, 'HS256');

    // 9) Respond with token
    echo json_encode(['api_token' => $jwt]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
