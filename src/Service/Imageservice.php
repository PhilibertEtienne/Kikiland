<?php

namespace App\Service;

class ImageService
{

    public function getImagesFromFolder(string $folder): array
    {
        $folderPath = "assets/Images/" . $folder;
    
        // Check if the folder exists
        if (!is_dir($folderPath)) {
            throw new \InvalidArgumentException('The specified folder does not exist.');
        }
    
        // Use glob to filter files by extension
        $files = glob($folderPath . '/*.avif');
        $files = array_merge($files, glob($folderPath . '/*.jpg'));
    
        // Extract file names from paths and get available extensions
        $imageArray = [];
        foreach ($files as $file) {
            $filename = pathinfo($file, PATHINFO_FILENAME);
            $extension = pathinfo($file, PATHINFO_EXTENSION);
    
            // Create an object with filename and available extensions
            $imageObject = [
                'filename' => $filename,
                'extensions' => [$extension],
            ];
    
            // If the object already exists in the array, add the extension
            $key = array_search($filename, array_column($imageArray, 'filename'));
            if ($key !== false) {
                $imageArray[$key]['extensions'][] = $extension;
            } else {
                $imageArray[] = $imageObject;
            }
        }
    
        return $imageArray;
    }
    
}


//TODO : return image en avif/jpg 
// récuperer le nom du fichier 
// créer objet si non existant
// ajouter propriété correspondant à l'extension