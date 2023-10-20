<?php

namespace App\Service;

class ImageService
{

    public function getImagesFromFolder(string $folder): array
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
