<?php

namespace App\Controller;

class HomeController extends AbstractController
{
    /**
     * Display home page
     */
    public function index(): string
    {
        return $this->twig->render('Home/home.html.twig');
    }

    public function illustration(): string
    {
        $images = $this->getImagesFromFolder('illustration');
        return $this->twig->render('Home/illustration.html.twig', ['images' => $images, 'url' => '/illustration']);
    }

    public function tattoo(): string
    {
        $images = $this->getImagesFromFolder('tattoo');
        return $this->twig->render('Home/tattoo.html.twig', ['images' => $images, 'url' => '/tattoo']);
    }

    public function objets(): string
    {
        $images = $this->getImagesFromFolder('objets');
        return $this->twig->render('Home/objet.html.twig', ['images' => $images, 'url' => '/objet']);
    }
}
