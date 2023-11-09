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
            if (in_array($file, [".", ".."])) continue;
            $fileInfo = pathinfo($file);

            if (array_key_exists('extension', $fileInfo)) {
                $extension = $fileInfo['extension'];

                if (strtolower($extension) === 'avif' || strtolower($extension) === 'gif'){
                    $imageArray[] = $file;
                }
            }
        }

        return $imageArray;
    }
}
