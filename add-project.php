<?php

session_start();

if (!isset($_SESSION['logged_in_user'])) {
    header('Location: /login.php');
    exit;
}

$errors = $_SESSION['error_messages'] ?? [];
unset($_SESSION['error_messages']);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Project</title>
</head>
<body>

    <h1>Add New Project</h1>

    <p>
        <a href="projects.php">Back to Dashboard</a>
    </p>

    <form action="includes/scripts/add_project.php" method="POST">

        <div>
            <label>Title</label><br>
            <input type="text" name="title">
            <?php if (!empty($errors['title'])) : ?>
                <p style="color:red;"><?php echo $errors['title']; ?></p>
            <?php endif; ?>
        </div>

        <div>
            <label>Short Description</label><br>
            <input type="text" name="short_description">
            <?php if (!empty($errors['short_description'])) : ?>
                <p style="color:red;"><?php echo $errors['short_description']; ?></p>
            <?php endif; ?>
        </div>

        <div>
            <label>Description</label><br>
            <textarea name="description"></textarea>
            <?php if (!empty($errors['description'])) : ?>
                <p style="color:red;"><?php echo $errors['description']; ?></p>
            <?php endif; ?>
        </div>

        <button type="submit">Create Project</button>

    </form>

</body>
</html>