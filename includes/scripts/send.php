<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use Portfolio\Database;

header('Content-Type: application/json; charset=utf-8');

$fname = $_POST['fname'] ?? null;
$lname = $_POST['lname'] ?? null;
$email = $_POST['email'] ?? null;
$city = $_POST['city'] ?? null;
$comments = $_POST['comments'] ?? null;
$company = $_POST['company'] ?? null;
$botcheck = $_POST['botcheck'] ?? null;

$errors = [];

if (!$fname) $errors[] = "First name is required.";
if (!$lname) $errors[] = "Last name is required.";
if (!$email) $errors[] = "Email is required.";
if (!$city) $errors[] = "City is required.";
if (!$comments) $errors[] = "Comments are required.";

if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email address.";
}

if (!empty($company)) {
    $errors[] = "Spam detected.";
}

if (trim($botcheck) !== "8") {
    $errors[] = "Bot check failed. Please answer the math question correctly.";
}

if (!empty($errors)) {
    echo json_encode(["errors" => $errors]);
    exit;
}

try {

    $database = new Database();

    $database->query(
        "INSERT INTO contacts (fname, lname, email, city, comments) 
         VALUES (:fname, :lname, :email, :city, :comments)",
        [
            "fname" => $fname,
            "lname" => $lname,
            "email" => $email,
            "city" => $city,
            "comments" => $comments
        ]
    );

    $emailBody = "First Name: $fname\n";
    $emailBody .= "Last Name: $lname\n";
    $emailBody .= "Email: $email\n";
    $emailBody .= "City: $city\n";
    $emailBody .= "Comments:\n$comments";

    mail("l_clementi@fanshaweonline.ca", "Portfolio Contact Form Submission", $emailBody);

    echo json_encode([
        "message" => "Message sent successfully."
    ]);
    exit;

} catch (Exception $e) {

    echo json_encode([
        "errors" => ["Something went wrong. Please try again."]
    ]);
    exit;
}