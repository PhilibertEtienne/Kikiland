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
            return $this->twig->render('Admin/upload.html.twig');
    }
    
}