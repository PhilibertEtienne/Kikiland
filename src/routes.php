<?php


return [
    //INDEX ROUTES
    '' => ['HomeController', 'index',],
    'illustration' => ['HomeController', 'illustration',],
    'tattoo' => ['HomeController', 'tattoo',],
    'objets' => ['HomeController', 'objets',],
    'admin' => ['AdminController', 'index',],
    'admin/illustration' => ['AdminController', 'adminIllustration',],
    'admin/tattoo' => ['AdminController', 'adminTattoo',],
    'admin/objets' => ['AdminController', 'adminObjets',],
    'admin/logout' => ['AdminController', 'logout',],
    'login' => ['LoginController', 'login',],
    'cursor' => ['AdminController', 'cursor',],
];
