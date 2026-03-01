<?php

namespace Portfolio;

use PDO;
use PDOException;

class Database
{
    public function query(string $query, array $bindings = []): array
    {
        $connection = $this->connect();
        $statement = $connection->prepare($query);

        foreach ($bindings as $key => $value) {
            $statement->bindValue(':' . $key, $value);
        }

        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function connect(): PDO
    {
        require_once __DIR__ . '/../../vendor/autoload.php';

        $dotenv = \Dotenv\Dotenv::createImmutable(dirname(__DIR__, 2));
        $dotenv->load();

        $config = $this->getConfig();

        $dsn = 'mysql:host='
            . $config['host']
            . ';dbname='
            . $config['database']
            . ';port='
            . $config['port']
            . ';charset=utf8mb4;';

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ];

        return new PDO(
            $dsn,
            $config['username'],
            $config['password'],
            $options
        );
    }

    public function getConfig(): array
    {
        return [
            'username' => $_ENV['DB_USER'] ?? '',
            'password' => $_ENV['DB_PASS'] ?? '',
            'host' => $_ENV['DB_HOST'] ?? '',
            'database' => $_ENV['DB_NAME'] ?? '',
            'port' => $_ENV['DB_PORT'] ?? '',
        ];
    }
}