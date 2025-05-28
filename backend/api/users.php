<?php
// backend/api/users.php

// 1) Autoload and environment setup
require_once __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->safeLoad();

// 2) CORS headers
require_once __DIR__ . '/cors.php';

// 3) JSON response
header('Content-Type: application/json');

use Backend\Config\Database;

try {
    // 4) Connect to database
    $pdo = Database::connect();

    // 5) Your original query with enhanced fields
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
            u.house,
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
            (SELECT GROUP_CONCAT(s.name SEPARATOR ', ') 
             FROM user_schools us 
             JOIN schools s ON us.school_id = s.id 
             WHERE us.user_id = u.id) AS schools,
            (SELECT GROUP_CONCAT(s.id) 
             FROM user_schools us 
             JOIN schools s ON us.school_id = s.id 
             WHERE us.user_id = u.id) AS school_ids,
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
        ORDER BY u.created_at DESC
    ");
    
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Process department and school arrays
    foreach ($users as &$user) {
        $user['departments'] = !empty($user['departments']) ? explode(', ', $user['departments']) : [];
        $user['department_ids'] = !empty($user['department_ids']) ? array_map('intval', explode(',', $user['department_ids'])) : [];
        $user['schools'] = !empty($user['schools']) ? explode(', ', $user['schools']) : [];
        $user['school_ids'] = !empty($user['school_ids']) ? array_map('intval', explode(',', $user['school_ids'])) : [];
    }

    // 6) Successful response
    echo json_encode([
        'status' => 'success',
        'users' => $users
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to fetch users: ' . $e->getMessage()
    ]);
}