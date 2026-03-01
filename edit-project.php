<?php

session_start();

if (!isset($_SESSION['logged_in_user'])) {
    header('Location: /login.php');
    exit;
}

require_once __DIR__ . '/includes/classes/Database.php';

use Portfolio\Database;

$database = new Database();

$id = $_GET['id'] ?? null;

if (!$id) {
    die('No project ID provided.');
}

$projectResults = $database->query(
    'SELECT * FROM projects WHERE id = :id AND is_deleted = 0;',
    ['id' => $id]
);

$project = $projectResults[0] ?? null;

if (!$project) {
    die('Project not found.');
}

$errors = $_SESSION['error_messages'] ?? [];
unset($_SESSION['error_messages']);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Project</title>
</head>
<body>

<h1>Edit Project</h1>

<p>
    <a href="projects.php">Back to Dashboard</a>
</p>

<form action="includes/scripts/edit_project.php" method="POST">

    <input type="hidden" name="id" value="<?php echo htmlspecialchars($project['id']); ?>">

    <div>
        <label>Title</label><br>
        <input type="text" name="title" value="<?php echo htmlspecialchars($project['title']); ?>">
        <?php if (!empty($errors['title'])) : ?>
            <p style="color:red;"><?php echo htmlspecialchars($errors['title']); ?></p>
        <?php endif; ?>
    </div>

    <div>
        <label>Short Description</label><br>
        <input type="text" name="short_description" value="<?php echo htmlspecialchars($project['short_description']); ?>">
        <?php if (!empty($errors['short_description'])) : ?>
            <p style="color:red;"><?php echo htmlspecialchars($errors['short_description']); ?></p>
        <?php endif; ?>
    </div>

    <div>
        <label>Description</label><br>
        <textarea name="description"><?php echo htmlspecialchars($project['description']); ?></textarea>
        <?php if (!empty($errors['description'])) : ?>
            <p style="color:red;"><?php echo htmlspecialchars($errors['description']); ?></p>
        <?php endif; ?>
    </div>

    <button type="submit">Update Project</button>

</form>

</body>
</html>