<?php


return [
    //INDEX ROUTES
    '' => ['HomeController', 'index',],
    'admin' => ['AdminController', 'index',],
    'admin/flash' => ['AdminController', 'adminFlash',],
    'admin/tattoo' => ['AdminController', 'adminTattoo',],
    'admin/objets' => ['AdminController', 'adminObjets',],
    'login' => ['LoginController', 'login',],
];