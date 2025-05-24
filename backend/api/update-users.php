<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../Config/cors.php';

use Backend\Config\Database;

session_start();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
  exit;
}

if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'superadmin') {
  http_response_code(403);
  echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
  exit;
}

try {
  $db = new Database();
  $pdo = $db->connect();

  $data = json_decode(file_get_contents('php://input'), true);
  if (!$data) throw new Exception('Invalid JSON input');

  $pdo->beginTransaction();

  foreach ($data as $u) {
    // Update main user table
    $stmt = $pdo->prepare("UPDATE users SET 
      first_name = :first_name,
      last_name = :last_name,
      email = :email,
      username = :username,
      position_id = :position,
      role = :role,
      temp_password = :temp_password
      WHERE id = :id
    ");
    $stmt->execute([
      ':first_name' => $u['first_name'],
      ':last_name' => $u['last_name'],
      ':email' => $u['email'],
      ':username' => $u['username'],
      ':position' => $u['position'],
      ':role' => $u['role'],
      ':temp_password' => $u['temp_password'],
      ':id' => $u['id']
    ]);

    // Clear existing department assignments
    $pdo->prepare("DELETE FROM user_departments WHERE user_id = ?")->execute([$u['id']]);

    // Insert updated departments
    if (!empty($u['departments'])) {
      foreach ($u['departments'] as $deptName) {
        // 🔍 Get department ID from name
        $stmt = $pdo->prepare("SELECT id FROM departments WHERE name = ?");
        $stmt->execute([$deptName]);
        $dept = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($dept) {
          $pdo->prepare("INSERT INTO user_departments (user_id, department_id) VALUES (?, ?)")
              ->execute([$u['id'], $dept['id']]);
        }
      }
    }
  }

  $pdo->commit();
  echo json_encode(['status' => 'success', 'message' => 'Users updated']);
} catch (Exception $e) {
  if ($pdo && $pdo->inTransaction()) $pdo->rollBack();
  http_response_code(500);
  echo json_encode([
    'status' => 'error',
    'message' => 'Update failed',
    'error' => $e->getMessage(),
    'trace' => $e->getTraceAsString()
  ]);
}
