<?php

namespace App\Service;

use Twig\Environment;
use Twig\Extension\DebugExtension;
use Twig\Loader\FilesystemLoader;
use App\Service\ImageService;

class Security
{

    protected $imageService;
    protected Environment $twig;
    protected $errors = [];

    public function __construct()
    {
        $this->imageService = new ImageService();

        $loader = new FilesystemLoader(APP_VIEW_PATH);
        $this->twig = new Environment(
            $loader,
            [
                'cache' => false,
                'debug' => true,
            ]
        );
        $this->twig->addExtension(new DebugExtension());
    }

    public function getCSRFToken(): ?string
    {
        if (empty($_SESSION['token'])) {
            $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
        }
        return $_SESSION['token'];
    }

    public function handleAdminRequest(string $folderName): string
    {
        $this->checkLoginStatus();
        $errors = [];
        $imageArray = $this->imageService->getImagesFromFolder($folderName);

        if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["delete"])) {
            $this->deleteImage($folderName);
        }
        if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["destination"])) {
            $this->addImage();
        }
        $template = 'Admin/Nav/' . $folderName . '_admin.html.twig';
        return $this->twig->render($template, ['images' => $imageArray, 'errors' => $this->errors]);
    }

    public function checkLoginStatus(): bool
    {
        if (!isset($_SESSION['isLogin']) || $_SESSION['isLogin'] !== true) {
            header('Location: /login');
            exit();
        }
        return true;
    }

    public function addImage()
    {
        $uploadDir = 'assets/Images/' . $_POST['destination'];

        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'avif'];
        $maxFileSize = 2 * 1024 * 1024;

        $uploadedFile = $_FILES['avatar'];
        $fileExtension = strtolower(pathinfo($uploadedFile['name'], PATHINFO_EXTENSION));
        $fileSize = $uploadedFile['size'];

        if (!in_array($fileExtension, $allowedTypes)) {
            $this->errors[] = 'Invalid file type. Allowed types: ' . implode(', ', $allowedTypes);
        }

        if ($fileSize > $maxFileSize) {
            $this->errors[] = 'File size exceeds the maximum limit of ' . ($maxFileSize / 1024 / 1024) . 'MB';
        }

        if (empty($this->errors)) {
            $uploadFile = $uploadDir . '/' . basename($uploadedFile['name']);
            move_uploaded_file($uploadedFile['tmp_name'], $uploadFile);
            header("Location: /admin/" . $_POST['destination']);
            exit;
        }
    }

    public function deleteImage(string $folder)
    {
        $filename = $_POST["filename"];
        $imagePath = "assets/Images/" . $folder . "/" . $filename;

        if (file_exists($imagePath)) {
            unlink($imagePath);
        }
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
