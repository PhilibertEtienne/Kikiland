<?php

namespace App\Controller;
use App\Model\UserManager;
use App\Service\Security;

class LoginController extends AbstractController
{
    public function login()
    {
        $errors = [];
        $security = new Security;
        $csrfToken = $security->getCSRFToken();
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if ($_POST['token'] !== $_SESSION['token']) {
                $errors[] = 'Invalid csrf token';
            } else {
                $credentials = array_map('trim', $_POST);
                $userManager = new UserManager();
                $user = $userManager->selectOneByUsername($credentials['username']);
                if ($user && password_verify($credentials['password'], $user['password'])) {
                    $_SESSION['isLogin'] = true;
                    header('Location: /admin');
                    exit();
                } else {
                    $errors[] = 'Wrong username or password';
                }
            }
        }
        return $this->twig->render('Admin/login.html.twig', ['errors' => $errors, 'csrf_token' => $csrfToken]);
    }
}