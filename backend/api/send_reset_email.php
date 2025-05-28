<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../Config/cors.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email']);
    exit;
}

try {
    $pdo = new PDO(
        "mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_NAME']};charset=utf8mb4",
        $_ENV['DB_USER'],
        $_ENV['DB_PASS']
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if email exists in users
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['status' => 'error', 'message' => 'Email not found']);
        exit;
    }

    // Generate token
    $token = bin2hex(random_bytes(32));
    $expires_at = date('Y-m-d H:i:s', strtotime('+1 hour'));

    // Remove existing tokens for the email
    $pdo->prepare("DELETE FROM password_resets WHERE email = ?")->execute([$email]);

    // Insert new token
    $stmt = $pdo->prepare("INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)");
    $stmt->execute([$email, $token, $expires_at]);

    // Build reset URL
    $resetUrl = "http://localhost:5173/reset-password?token=$token";

    // Send email via PHPMailer
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host       = $_ENV['SMTP_HOST'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $_ENV['SMTP_USERNAME'];
    $mail->Password   = $_ENV['SMTP_PASSWORD'];
    $mail->SMTPSecure = $_ENV['SMTP_ENCRYPTION'];
    $mail->Port       = $_ENV['SMTP_PORT'];

    $mail->setFrom($_ENV['MAIL_FROM'], $_ENV['MAIL_FROM_NAME'] ?? 'Caribucate');
    $mail->addAddress($email, $user['first_name']);

    $mail->isHTML(true);
    $mail->Subject = 'Reset Your Password';
    $mail->Body    = "Hi <b>{$user['first_name']}</b>,<br><br>
                      Click the link below to reset your password:<br><br>
                      <a href='$resetUrl'>$resetUrl</a><br><br>
                      This link will expire in 1 hour.";

    $mail->send();

    echo json_encode(['status' => 'success', 'message' => 'Reset email sent']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Mailer error: ' . $e->getMessage()]);
}
