<?php


return [
    'items' => ['ItemController', 'index',],
    'items/edit' => ['ItemController', 'edit', ['id']],
    'items/show' => ['ItemController', 'show', ['id']],
    'items/add' => ['ItemController', 'add',],
    'items/delete' => ['ItemController', 'delete',],
    //INDEX ROUTES
    '' => ['HomeController', 'index',],
    //PRODUIT ROUTES
    'produit/add' => ['ProduitController', 'add',],
    'produit/update' => ['ProduitController', 'update', ['id']],
    'produit/show' => ['ProduitController', 'show'],
    'produit/show-by-week' => ['ProduitController', 'showByWeek'],
    //MENTIONS ROUTES
    'mentions_legales' => ['MentionsLegalesController', 'browse',],
    //MENU ROUTES
    'menu' => ['MenuController', 'browse',],
    //COORDONNES ROUTES
    'coordonneesclient' => ['CoordonneesClientController','add',],
    //COMMANDE ROUTES
    'commandeproduit' => ['CommandeProductController', 'browse',],
    'commande_validee' => ['CommandeValideeController','browse',],
    'commande_validee_admin' => ['CommandeValideeAdminController','browse',],
    'devis' => ['DevisController','browse',],
    //CLIENT ROUTES
    'client/add' => ['ClientController', 'add',],
    'client/show' => ['ClientController', 'show', ['id']],
    'client/update' => ['ClientController', 'update', ['id']],
    //ADMIN ROUTES
    'admin' => ['AdminController', 'index',],
    'login' => ['LoginController', 'login',],
    'logout' => ['LogoutController', 'logout',],
];