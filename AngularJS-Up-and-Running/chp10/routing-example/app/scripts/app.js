angular.module('FifaApp', ['ngRoute'])
       .config(function($routeProvider){
           $routeProvider.when('/', {
               templateUrl: 'views/teams_list.html',
               controller: 'TeamListCtrl as teamListCtrl'
           }).when('/login',  {
               templateUrl: 'views/login.html'
           }).when('/team/:code', {
               templateUrl: 'views/team_details.html',
               controller: 'TeamDetailsCtrl as teamDetailsCtrl',
               resolve: {
                   auth: ['$q', '$location', 'UserService', 
                        function($q, $location, UserService){
                            return UserService.session().then(
                                function(success){

                                },
                                function(err){
                                    //Setting the redirect path
                                    $location.path('/login');
                                    $location.replace();  //This prevents the path from entering the browser history
                                   
                                    return $q.reject(err); //We do this because we want the promise to fail.
                                    //If we did not do $q.reject(err), that tells AngularJS that the error was handled successfully.
                                }                               
                            );
                        }
                   ]
               }
           });

           $routeProvider.otherwise({
               redirectTo: '/'
           });
       })