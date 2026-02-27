<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use Portfolio\Database;

header('Content-Type: application/json; charset=utf-8');

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(["errors" => ["ID is required."]]);
    exit;
}

try {

    $database = new Database();

    $projectResults = $database->query(
        "SELECT * FROM projects WHERE id = :id",
        ["id" => $id]
    );

    if (!$projectResults || count($projectResults) === 0) {
        echo json_encode(["errors" => ["Project not found."]]);
        exit;
    }

    $project = $projectResults[0];

    echo json_encode($project);
    exit;

} catch (Exception $e) {

    echo json_encode([
        "errors" => ["Something went wrong."]
    ]);
    exit;
}