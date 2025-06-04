<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/cors.php';

header('Content-Type: application/json');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$data = json_decode(file_get_contents("php://input"), true);
$token = $data['token'] ?? '';
$password = $data['password'] ?? '';

if (!$token || !$password) {
  echo json_encode(['status' => 'error', 'message' => 'Token and password required']);
  exit;
}

try {
  $pdo = new PDO(
    "mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_NAME']};charset=utf8mb4",
    $_ENV['DB_USER'],
    $_ENV['DB_PASS']
  );
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // Find token
  $stmt = $pdo->prepare("SELECT * FROM password_resets WHERE token = ?");
  $stmt->execute([$token]);
  $reset = $stmt->fetch(PDO::FETCH_ASSOC);

  if (!$reset || strtotime($reset['expires_at']) < time()) {
    echo json_encode(['status' => 'error', 'message' => 'Token expired or invalid']);
    exit;
  }

  // Update user's password
  $hashed = password_hash($password, PASSWORD_BCRYPT);
  $stmt = $pdo->prepare("UPDATE users SET password = ?,temp_password = ? WHERE email = ?");
  $stmt->execute([$hashed,'',$reset['email']]);

  // Clean up used token
  $pdo->prepare("DELETE FROM password_resets WHERE email = ?")->execute([$reset['email']]);

  echo json_encode(['status' => 'success', 'message' => 'Password updated']);
} catch (Exception $e) {
  echo json_encode(['status' => 'error', 'message' => 'Server error']);
}
