<?php


return [
    //INDEX ROUTES
    '' => ['HomeController', 'index',],
    'illustration' => ['HomeController', 'illustration',],
    'tattoo' => ['HomeController', 'tattoo',],
    'objet' => ['HomeController', 'objets',],
    'admin' => ['AdminController', 'index',],
    'admin/flash' => ['AdminController', 'adminFlash',],
    'admin/tattoo' => ['AdminController', 'adminTattoo',],
    'admin/objets' => ['AdminController', 'adminObjets',],
    'admin/logout' => ['AdminController', 'logout',],
    'login' => ['LoginController', 'login',],
    'cursor' => ['AdminController', 'cursor',],
];
