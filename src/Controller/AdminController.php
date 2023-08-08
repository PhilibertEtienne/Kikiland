<?php

namespace App\Controller;

use App\Service\ImageService;

class AdminController extends AbstractController
{
    /**
     * Display home page    
     */
    protected $errors = [];

    public function index(): string
    {
        $this->checkLoginStatus();

        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $this->addImage();
        }

        return $this->twig->render('Admin/admin.html.twig', ['errors' => $this->errors]);
    }

    public function cursor(): string
    {

        return $this->twig->render('Admin/cursor.html.twig');
    }

    public function adminFlash(): string
    {
        $this->checkLoginStatus();
        $errors = [];
        $imageFirst = $this->getImagesFromFolder("grid-fixe/first");
        $imageSecond = $this->getImagesFromFolder("grid-fixe/second");
        $imageThird = $this->getImagesFromFolder("grid-fixe/third");
        $imageFourth = $this->getImagesFromFolder("grid-fixe/fourth");
        $imageFifth = $this->getImagesFromFolder("grid-fixe/fifth");
        $grids = [];
        for ($i = 0; $i < count($imageFirst); $i++) {
            $grids[$i][] = $imageFirst[$i];
            $grids[$i][] = $imageSecond[$i];
            $grids[$i][] = $imageThird[$i];
            $grids[$i][] = $imageFourth[$i];
            $grids[$i][] = $imageFifth[$i];
        }

        // if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["delete"])) {
        //     $this->deleteImage($folderName);
        // }
        // if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["destination"])) {
        //     $this->addImage();
        // }
        // $template = 'Admin/Nav/' . $folderName . '_admin.html.twig';
        return $this->twig->render(
            'Admin/Nav/flash_admin.html.twig',
            [
                'grids' => $grids,
                'errors' => $this->errors
            ]
        );
    }

    public function adminTattoo(): string
    {
        return $this->handleAdminRequest('tattoo');
    }

    public function adminObjets(): string
    {
        return $this->handleAdminRequest('objet');
    }

    private function handleAdminRequest(string $folderName): string
    {
        $this->checkLoginStatus();
        $errors = [];
        $imageArray = $this->getImagesFromFolder($folderName);

        if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["delete"])) {
            $this->deleteImage($folderName);
        }
        if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["destination"])) {
            $this->addImage();
        }
        $template = 'Admin/Nav/' . $folderName . '_admin.html.twig';
        return $this->twig->render($template, ['images' => $imageArray, 'errors' => $this->errors]);
    }

    private function checkLoginStatus(): bool
    {
        if (!isset($_SESSION['isLogin']) || $_SESSION['isLogin'] !== true) {
            header('Location: /login');
            exit();
        }
        return true;
    }

    private function getImagesFromFolder(string $folder)
    {
        $folderPath = "assets/Images/" . $folder;
        $files = scandir($folderPath);
        $imageArray = [];

        foreach ($files as $file) {
            if (in_array($file, array(".", ".."))) continue;
            $imageArray[] = $file;
        }
        return $imageArray;
    }

    private function addImage()
    {
        // Directory where the uploaded files should be stored
        $uploadDir = 'assets/Images/' . $_POST['destination'];

        // Make sure the destination directory exists; if not, create it
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif']; // List of allowed file extensions
        $maxFileSize = 2 * 1024 * 1024; // Maximum file size in bytes (2MB)

        $uploadedFile = $_FILES['avatar'];
        $fileExtension = strtolower(pathinfo($uploadedFile['name'], PATHINFO_EXTENSION));
        $fileSize = $uploadedFile['size'];

        if (!in_array($fileExtension, $allowedTypes)) {
            $this->errors[] = 'Invalid file type. Allowed types: ' . implode(', ', $allowedTypes);
        }

        if ($fileSize > $maxFileSize) {
            $this->errors[] = 'File size exceeds the maximum limit of ' . ($maxFileSize / 1024 / 1024) . 'MB';
        }

        // Move the uploaded file to the destination directory if no errors
        if (empty($this->errors)) {
            $uploadFile = $uploadDir . '/' . basename($uploadedFile['name']);
            move_uploaded_file($uploadedFile['tmp_name'], $uploadFile);
        }
    }

    private function deleteImage(string $folder)
    {
        $filename = $_POST["filename"];
        $imagePath = "assets/Images/" . $folder . "/" . $filename;

        // Make sure the file exists before attempting to delete
        if (file_exists($imagePath)) {
            unlink($imagePath); // Delete the image file
        }

        // Redirect back to the admin page after deletion
        header("Location: /admin/" . $folder);
        exit;
    }

    public function logout(): void
    {
        $_SESSION['isLogin'] = false;
        header('Location: /login');
        exit();
    }
}
