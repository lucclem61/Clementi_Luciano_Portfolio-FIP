<?php

session_start();

if (!isset($_SESSION['logged_in_user'])) {
    header('Location: /login.php');
    exit;
}

require_once __DIR__ . '/../classes/Database.php';

use Portfolio\Database;

$errors = [];

$id = $_POST['id'] ?? null;
$title = trim($_POST['title'] ?? '');
$shortDescription = trim($_POST['short_description'] ?? '');
$description = trim($_POST['description'] ?? '');

if (!$id) {
    die('No project ID provided.');
}

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
    header('Location: /edit-project.php?id=' . $id);
    exit;
}

$database = new Database();

$database->query(
    "UPDATE projects 
     SET title = :title,
         short_description = :short_description,
         description = :description
     WHERE id = :id;",
    [
        'title' => $title,
        'short_description' => $shortDescription,
        'description' => $description,
        'id' => $id
    ]
);

header('Location: /projects.php');
exit;