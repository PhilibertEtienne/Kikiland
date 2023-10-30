<?php


return [
    //INDEX ROUTES
    '' => ['HomeController', 'index',],
    'illustration' => ['HomeController', 'illustration',],
    'tattoo' => ['HomeController', 'tattoo',],
    'objets' => ['HomeController', 'objets',],
    'contact' => ['HomeController', 'contact',],
    'mentions-legales' => ['HomeController', 'mentions',],
    'admin' => ['AdminController', 'index',],
    'admin/illustration' => ['AdminController', 'adminIllustration',],
    'admin/tattoo' => ['AdminController', 'adminTattoo',],
    'admin/objets' => ['AdminController', 'adminObjets',],
    'admin/logout' => ['AdminController', 'logout',],
    'login' => ['LoginController', 'login',],
];
