<?php

use Angefangeat\ClementiLucianoPortfolioFip\Database;

require_once __DIR__ . '/../../vendor/autoload.php';

$db = new Database();

$results = $db->query(
    "SELECT *
     FROM projects
     WHERE is_deleted = 0
     ORDER BY id ASC"
);

echo json_encode($results);
die;