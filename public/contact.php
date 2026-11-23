<?php
// Hostinger Contact Form Mailer for Outbox Downloader (outboxdownloader.com)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method Not Allowed"]);
    exit;
}

// Parse JSON or standard POST input
$raw_input = file_get_contents("php://input");
$input = json_decode($raw_input, true);
if (!$input) {
    $input = $_POST;
}

$fullName = isset($input['fullName']) ? trim($input['fullName']) : (isset($input['name']) ? trim($input['name']) : '');
$email = isset($input['email']) ? trim($input['email']) : '';
$topic = isset($input['topic']) ? trim($input['topic']) : 'General Inquiry';
$subject = isset($input['subject']) ? trim($input['subject']) : '';
$message = isset($input['message']) ? trim($input['message']) : '';
$ticketId = isset($input['ticketId']) ? trim($input['ticketId']) : ('OBX-' . rand(100000, 999999));

// Validation
if (empty($fullName) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Please complete all required fields."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Please provide a valid email address."]);
    exit;
}

// Destination email on your Hostinger account
$to = "contact@outboxdownloader.com";
$email_subject = "[$ticketId] $topic: " . (!empty($subject) ? $subject : "New Website Inquiry");

$email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>New Outbox Downloader Inquiry</title>
</head>
<body style='font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; padding: 24px;'>
    <div style='max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);'>
        <div style='background: #2563eb; color: #ffffff; padding: 20px 24px;'>
            <h2 style='margin: 0; font-size: 20px; font-weight: 700;'>New Outbox Contact Inquiry</h2>
            <div style='font-size: 13px; opacity: 0.9; margin-top: 4px;'>Ticket Ref: " . htmlspecialchars($ticketId) . "</div>
        </div>
        <div style='padding: 24px;'>
            <table style='width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;'>
                <tr>
                    <td style='padding: 8px 0; color: #64748b; width: 120px;'><strong>Name:</strong></td>
                    <td style='padding: 8px 0; color: #0f172a;'><strong>" . htmlspecialchars($fullName) . "</strong></td>
                </tr>
                <tr>
                    <td style='padding: 8px 0; color: #64748b;'><strong>Email:</strong></td>
                    <td style='padding: 8px 0;'><a href='mailto:" . htmlspecialchars($email) . "' style='color: #2563eb; text-decoration: none;'>" . htmlspecialchars($email) . "</a></td>
                </tr>
                <tr>
                    <td style='padding: 8px 0; color: #64748b;'><strong>Topic:</strong></td>
                    <td style='padding: 8px 0; color: #0f172a;'>" . htmlspecialchars($topic) . "</td>
                </tr>
                <tr>
                    <td style='padding: 8px 0; color: #64748b;'><strong>Subject:</strong></td>
                    <td style='padding: 8px 0; color: #0f172a;'>" . htmlspecialchars($subject ?: 'None specified') . "</td>
                </tr>
            </table>

            <hr style='border: none; border-top: 1px solid #f1f5f9; margin: 20px 0;'>

            <div style='font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 10px;'>Message Content:</div>
            <div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; color: #334155; white-space: pre-wrap; word-break: break-word;'>" . htmlspecialchars($message) . "</div>

            <hr style='border: none; border-top: 1px solid #f1f5f9; margin: 24px 0 16px 0;'>

            <div style='font-size: 12px; color: #94a3b8; text-align: center;'>
                Sent directly from <a href='https://outboxdownloader.com' style='color: #2563eb; text-decoration: none;'>outboxdownloader.com</a> contact form.
            </div>
        </div>
    </div>
</body>
</html>
";

$headers = [
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
    "From: Outbox Downloader <contact@outboxdownloader.com>",
    "Reply-To: " . htmlspecialchars($fullName) . " <" . $email . ">",
    "X-Mailer: Hostinger-PHP/" . phpversion()
];

// Send using Hostinger built-in mail() service
$mail_success = @mail($to, $email_subject, $email_body, implode("\r\n", $headers));

if ($mail_success) {
    echo json_encode([
        "success" => true,
        "message" => "Message sent successfully!",
        "ticketId" => $ticketId
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Hostinger mail service could not send the message. Please contact us directly at contact@outboxdownloader.com"
    ]);
}
