<?php

if($_SERVER['REQUEST_METHOD'] === 'POST') {

    $recipient = 'luciano.s.clementi@gmail.com';
    $subject = 'Inquiry from my portfolio site';

    $first_raw = $_POST['fname'] ?? '';
    $last_raw = $_POST['lname'] ?? '';
    $email_raw = $_POST['email'] ?? '';
    $city_raw = $_POST['city'] ?? '';
    $comments_raw = $_POST['comments'] ?? '';

    $first = trim($first_raw);
    $last = trim($last_raw);
    $email = trim($email_raw);
    $city = trim($city_raw);
    $comments = trim($comments_raw);

    $fail = [];

    if($first === '') {
        $fail[] = 'first name';
    }

    if($last === '') {
        $fail[] = 'last name';
    }

    if($email === '') {
        $fail[] = 'email';
    }

    if($city === '') {
        $fail[] = 'city';
    }

    if($comments === '') {
        $fail[] = 'comments';
    }

    if(!empty($fail)) {
        $msg = 'Please complete: ' . implode(', ', $fail);
        header("Location: ../contact.php?msg=$msg");
        exit();
    }

    $emailBody = "First Name: $first\n";
    $emailBody .= "Last Name: $last\n";
    $emailBody .= "Email: $email\n";
    $emailBody .= "City: $city\n\n";
    $emailBody .= "Comments:\n$comments\n";

    mail($recipient, $subject, $emailBody);

    $msg = "Thank you for your message.";
    header("Location: ../contact.php?msg=$msg");
    exit();

} else {
    echo "Invalid request.";
}
