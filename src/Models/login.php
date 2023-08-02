<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // trim the form input
    $username = trim($_POST["username"]); 
    $password = trim($_POST["password"]); 
    // Query the database 
    $sql = "SELECT * FROM kikiland WHERE username = :username";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    // login or throw exception
    if ($user && password_verify($password, $user['your_password_column'])) {
        $_SESSION['isLogin'] = true;
    } else {
        // Invalid username or password
        echo "Invalid username or password";
    }
}
?>