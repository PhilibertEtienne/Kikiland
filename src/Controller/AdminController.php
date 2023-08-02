<?php

namespace App\Controller;

class AdminController extends AbstractController
{
    /**
     * Display home page
     */
    public function index(): string
    {
        $this->checkLoginStatus();

        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            // Directory where the uploaded files should be stored
            $uploadDir = 'assets/Images/' . $_POST['destination'];

            // Make sure the destination directory exists; if not, create it
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            // Move the uploaded file to the destination directory
            $uploadFile = $uploadDir . '/' . basename($_FILES['avatar']['name']);
            move_uploaded_file($_FILES['avatar']['tmp_name'], $uploadFile);
        }

        return $this->twig->render('Admin/admin.html.twig');
    }
}
