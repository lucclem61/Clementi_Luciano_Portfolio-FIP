<?php

use Angefangeat\ClementiLucianoPortfolioFip\Database;

require_once __DIR__ . '/../../vendor/autoload.php';

header('Content-Type: application/json; charset=utf-8');

$errors = [];

$firstName = trim($_POST['fname'] ?? '');
$lastName  = trim($_POST['lname'] ?? '');
$email     = trim($_POST['email'] ?? '');
$city      = trim($_POST['city'] ?? '');
$message   = trim($_POST['comments'] ?? '');
$company   = trim($_POST['company'] ?? '');
$botcheck  = trim($_POST['botcheck'] ?? '');

if ($firstName === '') {
    $errors[] = 'First name is required.';
}

if ($lastName === '') {
    $errors[] = 'Last name is required.';
}

if ($email === '') {
    $errors[] = 'Email is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email format.';
}

if ($city === '') {
    $errors[] = 'City is required.';
}

if ($message === '') {
    $errors[] = 'Message is required.';
}

if ($company !== '') {
    $errors[] = 'Spam detected.';
}

if ($botcheck !== '8') {
    $errors[] = 'Bot verification failed.';
}

if (!empty($errors)) {
    echo json_encode(['errors' => $errors]);
    exit;
}

try {

    $db = new Database();

    $db->query(
        "INSERT INTO contact_messages 
        (first_name, last_name, email, city, message) 
        VALUES 
        (:first_name, :last_name, :email, :city, :message)",
        [
            'first_name' => $firstName,
            'last_name'  => $lastName,
            'email'      => $email,
            'city'       => $city,
            'message'    => $message
        ]
    );

    echo json_encode([
        'message' => 'Your message has been sent successfully.'
    ]);

    exit;

} catch (Exception $e) {

    echo json_encode([
        'errors' => ['Something went wrong. Please try again later.']
    ]);

    exit;
}