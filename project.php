<?php

require_once __DIR__ . '/vendor/autoload.php';

use Angefangeat\ClementiLucianoPortfolioFip\Database;

$database = new Database();

$id = $_GET['id'] ?? null;

if (!$id) {
    die('No project ID provided.');
}

$projectResults = $database->query(
    'SELECT * FROM projects WHERE id = :id AND is_deleted = 0;',
    ['id' => $id]
);

$singleProjectResult = $projectResults[0] ?? null;

if (!$singleProjectResult) {
    die('Project not found.');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($singleProjectResult['title']); ?> – Luciano Clementi</title>
    <link href="css/grid.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">
</head>
<body data-page="project">

    <h1><?php echo htmlspecialchars($singleProjectResult['title']); ?></h1>
    <p><?php echo htmlspecialchars($singleProjectResult['description']); ?></p>

</body>
</html>