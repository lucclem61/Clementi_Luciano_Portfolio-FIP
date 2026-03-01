<?php

namespace Angefangeat\ClementiLucianoPortfolioFip;

use Angefangeat\ClementiLucianoPortfolioFip\Database;

class Project {

    private Database $database;

    public function __construct() {
        $this->database = new Database();
    }

    public function getAll(): array {

    $sql = "SELECT * FROM projects WHERE is_deleted = 0";

    $results = $this->database->query($sql);

    return $results;

}

}

