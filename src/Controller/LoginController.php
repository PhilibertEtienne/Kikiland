<?php

namespace App\Controller;


class LoginController extends AbstractController
{
    /**
     * Display home page
     */
    public function index(): string
    {
        return $this->twig->render('Admin/login.html.twig');
    }
}