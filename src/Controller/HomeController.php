<?php

namespace App\Controller;


class HomeController extends AbstractController
{


    public function index(): string
    {
        return $this->twig->render('Home/home.html.twig');
    }

    public function contact(): string
    {
        return $this->twig->render('Home/contact.html.twig');
    }

    public function illustration(): string
    {
        $images = $this->imageService->getImagesFromFolder('illustration');
        return $this->twig->render('Home/illustration.html.twig', ['images' => $images, 'url' => '/illustration']);
    }

    public function tattoo(): string
    {
        $images = $this->imageService->getImagesFromFolder('tattoo');
        return $this->twig->render('Home/tattoo.html.twig', ['images' => $images, 'url' => '/tattoo']);
    }

    public function objets(): string
    {
        $images = $this->imageService->getImagesFromFolder('objets');
        return $this->twig->render('Home/objet.html.twig', ['images' => $images, 'url' => '/objets']);
    }
}
