<?php

namespace Portfolio;

use PDO;

class Database
{
    public function query(string $query, array $bindings = []): array
    {
        $connection = $this->connect();
        $statement = $connection->prepare($query);

        foreach ($bindings as $key => $value) {
            $statement->bindValue(":$key", $value);
        }

        $statement->execute();

        $results = $statement->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }

    public function connect()
    {
        require_once __DIR__ . '/../../vendor/autoload.php';

        $dotenv = \Dotenv\Dotenv::createImmutable(dirname(__DIR__, 2));
        $dotenv->load();

        $config = $this->getConfig();
        $dsn = $this->getDsn();

        $username = $config['username'];
        $password = $config['password'];

        return new PDO($dsn, $username, $password);
    }

    public function getConfig()
    {
        return [
            'username' => $_ENV['DB_USER'] ?? '',
            'password' => $_ENV['DB_PASS'] ?? '',
            'host' => $_ENV['DB_HOST'] ?? '',
            'database' => $_ENV['DB_NAME'] ?? '',
            'port' => $_ENV['DB_PORT'] ?? ''
        ];
    }

    public function getDsn()
    {
        $config = $this->getConfig();
        $host = $config['host'];
        $database = $config['database'];
        $port = $config['port'];

        return 'mysql:host='
            . $host
            . ';dbname='
            . $database
            . ';port='
            . $port
            . ';charset=utf8mb4;';
    }
}