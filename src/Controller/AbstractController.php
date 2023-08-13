<?php

namespace App\Controller;

use Twig\Environment;
use Twig\Extension\DebugExtension;
use Twig\Loader\FilesystemLoader;

/**
 * Initialized some Controller common features (Twig...)
 */
abstract class AbstractController
{
    protected Environment $twig;

    public function __construct()
    {
        $loader = new FilesystemLoader(APP_VIEW_PATH);
        $this->twig = new Environment(
            $loader,
            [
                'cache' => false,
                'debug' => true,
            ]
        );
        $this->twig->addExtension(new DebugExtension());
    }

    protected function getImagesFromFolder(string $folder)
    {
        $folderPath = "assets/Images/" . $folder;
        $files = scandir($folderPath);
        $imageArray = [];

        foreach ($files as $file) {
            if (in_array($file, array(".", ".."))) continue;
            $imageArray[] = $file;
        }
        return $imageArray;
    }
}