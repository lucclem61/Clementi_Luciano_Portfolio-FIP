<?php

session_start();

if (!isset($_SESSION['logged_in_user'])) {
    header('Location: /login.php');
    exit;
}

require_once __DIR__ . '/includes/classes/Database.php';

use Portfolio\Database;

$database = new Database();

/* Handle soft delete */
if (isset($_GET['delete'])) {

    $id = $_GET['delete'];

    $database->query(
        'UPDATE projects SET is_deleted = 1 WHERE id = :id;',
        ['id' => $id]
    );

    header('Location: /projects.php');
    exit;
}

$projects = $database->query(
    "SELECT * FROM projects WHERE is_deleted = 0 ORDER BY created_at DESC;"
);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projects Dashboard</title>
</head>
<body>

    <h1>Projects Dashboard</h1>

    <p>
        <a href="add-project.php">Add New Project</a> |
        <a href="logout.php">Logout</a>
    </p>

    <?php if (empty($projects)) : ?>

        <p>No projects found.</p>

    <?php else : ?>

        <ul>
            <?php foreach ($projects as $project) : ?>
                <li>
                    <strong><?php echo htmlspecialchars($project['title']); ?></strong>
                    <br>
                    <a href="edit-project.php?id=<?php echo $project['id']; ?>">Edit</a> |
                    <a href="projects.php?delete=<?php echo $project['id']; ?>">Delete</a>
                </li>
            <?php endforeach; ?>
        </ul>

    <?php endif; ?>

</body>
</html>