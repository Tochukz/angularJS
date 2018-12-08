//Root module and submodules/depedencies
var myModule = angular.module('Angello', [
    'ngRoute',
    'ngAnimate',
    'firebase',
    'ngMessages',
    'Angello.Common',
    'Angello.Dashboard',
    'Angello.Login',
    'Angello.Storyboard',
    'Angelo.User',
    'auth0',
    'angular-jwt',
    'angular-storage'
]);

// Defining a HTTP service interceptor using a factory service.
//Loading Interceptor
myModule.factory('loadingInterceptor', function(LoadingService){
    var loadingInterceptor = {
        request: function(config){
            LoadingService.setLoading(true);
            return config;
        },
        response: function(response){
            LoadingService.setLoading(false);
            return response;
        }
    }
    return loadingInterceptor;
});

//Rotuing
myModule.config(function($routeProvider, $httpProvider, $provide){
    $routeProvider.when('/', {
        templateUrl: 'src/angello/storyboard/tmpl/storybnoard.html',
        controller: 'StoryboardCtrl',
        controllerAs: 'storyboard'
    }).when('/dashboard', {
        templateUrl: 'src/angello/dashbard/tmpl/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
    }).when('/users', {
        templateUrl: 'src/angello/user/tmpl/users.html',
        controller: 'UserCtrl',
        controllerAs: 'users',
    }).when('/users/:userID', {
        templateUrl: 'src/angello/users/tmpl/user.html',
        controller: 'UserCtrl',
        controllerAs: 'myUser'
    }).when('/login', {
        templateUrl: 'src/angello/login/tmpl/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
    }).otherwise({
        redirectTo: '/'
    });

    //HTTP Service Interceptor
    $httpProvider.interceptors.push('loadingInterceptor');
    
    //Definding a decorator on the $log service
    $provide.decorate('$log', function($delegate){ //$delegate is a reference to the service, $log in this case
        function timeStamp(){
         
        }

        var debugFn = $delegate.debug; //Saving the original $log.debug() method

        $delegate.debug = function(){
            arguments[0] = timeStamp() + '-' + arguments[0];
            debugFn.apply(null, arguments);
        };
        return $delegate;
    });
});

//A value service. (can not be assessed in the module.config block during compilation)
myModule.value('STORY_TYPES', [
    {name: 'Feature'},
    {name: 'Enhancement'},
    {name: 'Bug'},
    {name: 'Spike'}
]);

