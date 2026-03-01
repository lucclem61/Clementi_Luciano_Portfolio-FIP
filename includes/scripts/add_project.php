<?php

session_start();

if (!isset($_SESSION['logged_in_user'])) {
    header('Location: /login.php');
    exit;
}

require_once __DIR__ . '/../classes/Database.php';

use Portfolio\Database;

$errors = [];

$title = trim($_POST['title'] ?? '');
$shortDescription = trim($_POST['short_description'] ?? '');
$description = trim($_POST['description'] ?? '');

if ($title === '') {
    $errors['title'] = 'Title is required.';
}

if ($shortDescription === '') {
    $errors['short_description'] = 'Short description is required.';
}

if ($description === '') {
    $errors['description'] = 'Description is required.';
}

if (!empty($errors)) {
    $_SESSION['error_messages'] = $errors;
    header('Location: /add-project.php');
    exit;
}

$database = new Database();

$database->query(
    "INSERT INTO projects 
    (title, short_description, description, media_type, media_path, view_link, is_deleted)
    VALUES 
    (:title, :short_description, :description, :media_type, :media_path, :view_link, 0)",
    [
        'title' => $title,
        'short_description' => $shortDescription,
        'description' => $description,
        'media_type' => 'image',
        'media_path' => '',
        'view_link' => null
    ]
);

header('Location: /projects.php');
exit;