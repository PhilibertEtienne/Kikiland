<?php

namespace App\Controller;
use App\Model\UserManager;

class HomeController extends AbstractController
{
    /**
     * Display home page
     */
    public function index(): string
    {
        $userManager = new UserManager();
        $userManager->create('bb','bb');
        return $this->twig->render('Home/home.html.twig');
    }
}