/*using resolve in route configuration */
angular.module('resolveApp', ['ngRoute'])
       .value('Constant', {MAGIC_NUMBER: 42})
       .config(['$routeProvider', function($routeProvider){
           $routeProvider.when('/home', {
               template: '<h1>Main Page, no resolves</h1>'
           }).when('/protected', {
               template: '<h2>Protected Page</h2>',
               resolve: {
                   immediate: ['Constant', function(Constant){
                       return Constant.MAGIC_NUMBER * 4;
                   }],
                   async: ['$http', function($http){
                       return $http.get('/api/hasAccess.php');
                   }]
               },
               controller: ['$log', 'immediate', 'async', 
                    function($log, immediate, async){                    
                        $log.log('Immediate is ', immediate);
                        $log.log('Server returned for async', async);
                    }
               ]
           });
       }]);
/*
* Resolves are a way of executing and finishing asynchronous tasks before a particular route is loaded. This is a great way to check if the user is
* logged in and has authorization and permissions, and even preload some data before a controller and route are loaded into the view.
* 
* Note that the two keys: 'immediate' and 'async', of the resolve object are of our own choosing. They could be 'myKey1' and 'myKey2'.  
*
* If there are multiple resolve keys that make asynchronous calls, AngularJS executes all of them in parallel and waits for all of them to finish executing 
* before loading the page.
*
* If any of the resolves encounter an error or any of the promises returned are rejected(is a failure), AngularJS doesn’t load the route.
*
* Test this by running the inbuilt PHP server:
* $ php -S 127.0.0.1:9000 -t AngularJS-Up-and-Running
* then navigate to http://127.0.0.1:9000/chp10/chp10b.html on the browser address bar.
*/