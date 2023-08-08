<?php


return [
    //INDEX ROUTES
    '' => ['HomeController', 'index',],
    'flash' => ['HomeController', 'flash',],
    'tattoo' => ['HomeController', 'tattoo',],
    'objets' => ['HomeController', 'objets',],
    'admin' => ['AdminController', 'index',],
    'admin/flash' => ['AdminController', 'adminFlash',],
    'admin/tattoo' => ['AdminController', 'adminTattoo',],
    'admin/objets' => ['AdminController', 'adminObjets',],
    'admin/logout' => ['AdminController', 'logout',],
    'login' => ['LoginController', 'login',],
    'cursor' => ['AdminController', 'cursor',],
];
