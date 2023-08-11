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
        return $this->twig->render('Home/home.html.twig');
    }

    public function flash(): string
    {
        return $this->twig->render('Home/flash.html.twig');
    }

    public function tattoo(): string
    {
        $images = $this->getImagesFromFolder('tattoo');
        return $this->twig->render('Home/tattoo.html.twig', ['images' => $images]);
    }

    public function objets(): string
    {
        return $this->twig->render('Home/objet.html.twig');
    }
}
