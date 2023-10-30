<?php

namespace App\Controller;

use App\Service\ContactForm;

class HomeController extends AbstractController
{

    // Properties
    protected ContactForm $ContactForm;

    public function __construct()
    {
        parent::__construct();

        $ContactForm = new ContactForm();
        $this->ContactForm = $ContactForm;
    }


    // Methods
    public function index(): string
    {
        return $this->twig->render('Home/home.html.twig');
    }

    public function contact(): string
    {
        $errors = [];
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $errors = $this->ContactForm->handleFormInput();
        }
        return $this->twig->render('Home/contact.html.twig', ['url' => '/contact', 'errors' => $errors]);
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

    public function mentions(): string
    {
        return $this->twig->render('Home/mentions-legales.html.twig', ['url' => '/mentions-legales']);
    }
}
