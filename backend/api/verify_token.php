<?php
// backend/api/verify_token.php

// 1) Autoload and environment setup
require_once __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->safeLoad();

// 2) CORS headers
require_once __DIR__ . '/cors.php';

// 3) JSON response
header('Content-Type: application/json');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Backend\Config\Database;

// 4) Get token from Authorization header or request body
$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$token = '';

if (str_starts_with($authHeader, 'Bearer ')) {
    $token = substr($authHeader, 7);
} else {
    $data = json_decode(file_get_contents('php://input'), true);
    $token = $data['api_token'] ?? '';
}

if (!$token) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'No token provided in Authorization header or request body'
    ]);
    exit;
}

try {
    // 5) Verify JWT
    $secret = $_ENV['JWT_SECRET'] ?? die('JWT_SECRET not set in .env');
    $decoded = JWT::decode($token, new Key($secret, 'HS256'));

    // 6) Get complete user data
    $pdo = Database::connect();
    // In your verify_token.php or profile.php
    $stmt = $pdo->prepare("
    SELECT 
        u.id,
        u.role,
        u.avatar,
        u.first_name,
        u.last_name,
        CONCAT(u.first_name, ' ', u.last_name) AS full_name,
        u.email,
        u.phone,
        u.username,
        u.dob,
        u.address1,
        u.address2,
        u.city,
        u.country,
        u.time_zone,
        u.on_site,
        u.created_at,
        u.updated_at,
        p.name AS position,
        p.id AS position_id,
        (SELECT GROUP_CONCAT(d.name SEPARATOR ', ') 
         FROM user_departments ud 
         JOIN departments d ON ud.department_id = d.id 
         WHERE ud.user_id = u.id) AS departments,
        (SELECT GROUP_CONCAT(d.id) 
         FROM user_departments ud 
         JOIN departments d ON ud.department_id = d.id 
         WHERE ud.user_id = u.id) AS department_ids,
        CASE 
            WHEN u.role = 'teacher' THEN t.form_class
            WHEN u.role = 'student' THEN s.form_class
            ELSE NULL
        END AS form_class,
        s.start_year,
        s.end_year,
        s.status AS student_status
    FROM 
        users u
    LEFT JOIN positions p ON u.position_id = p.id
    LEFT JOIN teachers t ON u.id = t.user_id
    LEFT JOIN students s ON u.id = s.user_id
    WHERE u.id = ?
");
    $stmt->execute([$decoded->sub]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Convert comma-separated departments to array
    if ($user['departments']) {
        $user['departments'] = explode(', ', $user['departments']);
        $user['department_ids'] = explode(',', $user['department_ids']);
    } else {
        $user['departments'] = [];
        $user['department_ids'] = [];
    }

    if (!$user) {
        throw new Exception('User not found in database');
    }

    // 7) Successful response with all user data
    // 7) Successful response with all user data
echo json_encode([
    'status' => 'success',
    'user' => [
        'id' => $user['id'],
        'role' => $user['role'],
        'avatar' => $user['avatar'] ?? '/media/avatars/blank.png',
        'firstName' => $user['first_name'],
        'lastName' => $user['last_name'],
        'fullName' => $user['full_name'],
        'email' => $user['email'],
        'phone' => $user['phone'] ?? null,
        'username' => $user['username'] ?? null,
        'dob' => $user['dob'] ?? null,
        'address1' => $user['address1'] ?? null,
        'address2' => $user['address2'] ?? null,
        'city' => $user['city'] ?? null,
        'country' => $user['country'] ?? null,
        'timeZone' => $user['time_zone'] ?? null,
        'onSite' => (bool)$user['on_site'],
        'createdAt' => $user['created_at'],
        'updatedAt' => $user['updated_at'],
        'position' => $user['position'] ?? null,
        'positionId' => $user['position_id'] ?? null,
        'departments' => $user['departments'],
        'departmentIds' => $user['department_ids'],
        'formClass' => $user['form_class'] ?? null,
        'startYear' => $user['start_year'] ?? null,
        'endYear' => $user['end_year'] ?? null,
        'studentStatus' => $user['student_status'] ?? null
    ]
]);
} catch (\Firebase\JWT\ExpiredException $e) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Token expired']);
} catch (\Firebase\JWT\SignatureInvalidException $e) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Invalid token signature']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Authentication failed: ' . $e->getMessage()
    ]);
}
