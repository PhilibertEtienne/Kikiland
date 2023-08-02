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
            return $this->twig->render('Admin/login.html.twig');
    }
    
}