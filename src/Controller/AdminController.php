<?php

namespace App\Controller;

use App\Service\ImageService;
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

    public function adminFlash(): string 
    {
        $this->checkLoginStatus();
        $imageArray = $this->getImagesFromFolder("flash");
        return $this->twig->render('Admin/Nav/flash_admin.html.twig',['images' => $imageArray]);
    }

    public function adminTattoo(): string 
    {
        $this->checkLoginStatus(); 
        $imageArray = $this->getImagesFromFolder("tattoo");

        // delete image
        if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["delete"])) {
            $filename = $_POST["filename"];
            $imagePath = "assets/Images/tattoo/" . $filename;
    
            // Make sure the file exists before attempting to delete
            if (file_exists($imagePath)) {
                unlink($imagePath); // Delete the image file
            }
    
            // Redirect back to the admin page after deletion
            header("Location: /admin/tattoo");
            exit;
        }
        return $this->twig->render('Admin/Nav/tattoo_admin.html.twig',['images' => $imageArray]);
    }

    public function adminObjets(): string 
    {
        $this->checkLoginStatus();
        $imageArray = $this->getImagesFromFolder("objet");
        return $this->twig->render('Admin/Nav/objet_admin.html.twig',['images' => $imageArray]);
    }
}
