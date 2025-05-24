<?php
require_once __DIR__ . '/../vendor/autoload.php'; // 🔥 REQUIRED
header('Content-Type: application/json');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

try {
    $pdo = new PDO(
        "mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_NAME']};charset=utf8mb4",
        $_ENV['DB_USER'],
        $_ENV['DB_PASS']
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed']));
}

$role = 'admin';
$username = 'administrator';
$email = 'admin@localhost.com';
$first_name = 'Admin';
$last_name = 'User';
$password = password_hash('$Kkj8412', PASSWORD_BCRYPT);
$tmp_password = '$Kkj8412';
$dob = '1990-01-01';
$address1 = 'Main St';
$address2 = '';
$city = 'Port of Spain';
$country = 'Trinidad and Tobago';
$time_zone = 'America/Port_of_Spain';
$on_site = 1;

try {
    $stmt = $pdo->prepare("INSERT INTO users (role, username, email, first_name, last_name, password,temp_password, dob, address1, address2, city, country, time_zone, on_site)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)");
    $stmt->execute([
        $role, $username, $email, $first_name, $last_name, $password,$tmp_password,
        $dob, $address1, $address2, $city, $country, $time_zone, $on_site
    ]);

    echo json_encode(['status' => 'success', 'message' => 'Admin user created']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
