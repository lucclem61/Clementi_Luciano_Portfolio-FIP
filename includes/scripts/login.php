<?php

session_start();

require_once __DIR__ . '/../classes/Database.php';

use Portfolio\Database;

$database = new Database();

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

$results = $database->query(
    'SELECT * FROM users WHERE username = :username;',
    ['username' => $username]
);

$user = $results[0] ?? null;


if ($user && password_verify($password, $user['password'])) {

    $_SESSION['logged_in_user'] = $user;

header('Location: /projects.php');
    exit;

} else {

    header('Location: /login.php');
    exit;
}