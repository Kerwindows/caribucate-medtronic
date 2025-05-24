<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../Config/cors.php';

use Backend\Config\Database;

session_start();

header('Content-Type: application/json');

// ✅ Ensure user is authenticated
if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

// ✅ Check superadmin role
$user = $_SESSION['user'];
if ($user['role'] !== 'superadmin') {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Access denied']);
    exit;
}

try {
    $db = new Database();
    $pdo = $db->connect();

    // 🔄 Fetch users and their departments and positions
    $stmt = $pdo->query("
        SELECT 
            u.id, u.first_name, u.last_name, u.username, u.email, u.temp_password, u.role, u.created_at,
            p.name AS position,
            GROUP_CONCAT(d.name) AS departments
        FROM users u
        LEFT JOIN positions p ON u.position_id = p.id
        LEFT JOIN user_departments ud ON u.id = ud.user_id
        LEFT JOIN departments d ON ud.department_id = d.id
        GROUP BY u.id
        ORDER BY u.created_at DESC
    ");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // ✅ Decode departments to array
    foreach ($users as &$u) {
        $u['departments'] = $u['departments'] ? explode(',', $u['departments']) : [];
    }

    // 🔄 Fetch all positions
    $positionsStmt = $pdo->query("SELECT id, name FROM positions ORDER BY name");
    $positions = $positionsStmt->fetchAll(PDO::FETCH_ASSOC);

    // 🔄 Fetch all departments
    $departmentsStmt = $pdo->query("SELECT id, name FROM departments ORDER BY name");
    $departments = $departmentsStmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'status' => 'success',
        'users' => $users,
        'positions' => $positions,
        'departments' => $departments
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error',
        'error' => $e->getMessage()
    ]);
}
