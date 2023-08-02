<?php

namespace App\Service;

Class Security {

    public function getCSRFToken(): ?string
        {
            if (empty($_SESSION['token'])) {
                $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
            }
            return $_SESSION['token'];
        }
}