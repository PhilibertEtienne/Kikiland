<?php

if($_SERVER["REQUEST_METHOD"] === "POST" ){ 
    $uploadDir = 'public/uploads/';
    $uploadFile = $uploadDir . basename($_FILES['avatar']['name']);
    move_uploaded_file($_FILES['avatar']['tmp_name'], $uploadFile);
}