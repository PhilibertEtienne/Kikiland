<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errors = [];
    // trim the form input
    $username = trim($_POST["username"]); 
    $password = trim($_POST["password"]); 
    $token = filter_input(INPUT_POST, 'token', FILTER_SANITIZE_STRING);

if (!$token || $token !== $_SESSION['token']) {
    // return 405 http status code
    header($_SERVER['SERVER_PROTOCOL'] . ' 405 Method Not Allowed');
    exit;
} else {
    // process the form
}
    // Query the database 
    $sql = "SELECT * FROM admin WHERE username = :username";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    // login or throw exception
    if ($user && password_verify($password, $user['your_password_column'])) {
        $_SESSION['isLogin'] = true;
    } else {
        if (!$user) {
            $errors[] = 'Wrong username';
        } else {
            $errors[] = 'Wrong password';
        }
    }
}
?>