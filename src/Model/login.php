<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errors = [];
    // trim the form input
    $username = trim($_POST["username"]); 
    $password = trim($_POST["password"]); 
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