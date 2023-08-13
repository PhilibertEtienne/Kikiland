<?php

namespace App\Controller;


class UploadController extends AbstractController
{
    /**
     * Display home page
     */
    public function index(): string
    {
            $this->checkLoginStatus();
            if($_SERVER["REQUEST_METHOD"] === "POST" ){ 
                $uploadDir = 'public/images/' . $_POST['destination'];
                $uploadFile = $uploadDir . basename($_FILES['avatar']['name']);
                move_uploaded_file($_FILES['avatar']['tmp_name'], $uploadFile);
            }
            return $this->twig->render('Admin/upload.html.twig');
    }
    
}