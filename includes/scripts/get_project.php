<?php

use Portfolio\Database;

require_once __DIR__ . '/../../vendor/autoload.php';

$id = $_GET['id'] ?? null;

if (!$id) {
    echo "ID is required";
    exit;
}

$db = new Database();

$results = $db->query(
    "SELECT *
     FROM projects
     WHERE id = :id
       AND is_deleted = 0
     LIMIT 1",
    ['id' => $id]
);

if (!$results || count($results) < 1) {
    echo "Project not found";
    exit;
}

$project = $results[0];

echo json_encode($project);
die;