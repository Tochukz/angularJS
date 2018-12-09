/*Enabling HTML5 Mode */
angular.module('myHTML5App', ['ngRoute'])
       .config(['$locationProvider', '$routeProvider', 
           function($locationProvider, $routeProvider){
               $locationProvider.html5Mode(true);
               //Optional
               $locationProvider.hashPrefix('!');

               //Route configuration here as normal
           }
       ]);

/*
To enable HTML5 mode, server-side support is also needed. While AngularJS can handle the initial index.html load, and handle all page URLs subsequent to the page load,
the server needs to be aware of what URLs AngularJS supports, and what URLs need to be responded by the server.
*/