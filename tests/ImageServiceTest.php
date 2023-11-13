<?php

use App\Service\ImageService;
use PHPUnit\Framework\TestCase;

class ImageServiceTest extends TestCase
{

    public function testGetImagesFromFolder()
    {
        $yourClass = new ImageService(); 
        $folderName = 'illustration'; 
        $expectedFolderPath = "assets/Images/$folderName";

        $result = $yourClass->getImagesFromFolder($folderName);
        $this->assertIsArray($result);
        $this->assertNotEmpty($result);

        foreach ($result as $file) {
            $this->assertFileExists("$expectedFolderPath/$file");
            $this->assertMatchesRegularExpression('/\.(avif|gif)$/i', $file);
        }
    }
}
