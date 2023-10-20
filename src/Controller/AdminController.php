<?php

namespace App\Controller;

use Twig\Environment;
use Twig\Extension\DebugExtension;
use Twig\Loader\FilesystemLoader;
use App\Service\ImageService;
use App\Service\Security;

class AdminController extends AbstractController
{
    // Init
    protected $security;
    protected Environment $twig;
    protected $imageService;
    public $errors = [];

    public function __construct()
    {
        parent::__construct();
        $security = new Security();
        $this->security = $security;
    }

    // Methods
    public function index(): string
    {
        $this->security->checkLoginStatus();

        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $this->security->addImage();
        }

        return $this->twig->render('Admin/admin.html.twig', ['errors' => $this->errors]);
    }

    public function adminTattoo(): string
    {
        return $this->security->handleAdminRequest('tattoo');
    }

    public function adminIllustration(): string
    {
        return $this->security->handleAdminRequest('illustration');
    }

    public function adminObjets(): string
    {
        return $this->security->handleAdminRequest('objets');
    }
}
