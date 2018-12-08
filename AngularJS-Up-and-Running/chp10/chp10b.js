/*using resolve in route configuration */
angular.module('resolveApp', ['ngRoute'])
       .value('Constant', {MAGIC_NUMBER: 42})
       .config(['$routeProvider', function($routeProvider){
           $routeProvider.when('/', {
               template: '<h1>Main Page, no resolves</h1>'
           }).when('/protected', {
               template: '<h2>Protected Page</h2>',
               resolve: {
                   immediate: ['Constant', function(Constant){
                       return Constant.MAGIC_NUMBER * 4;
                   }],
                   async: ['$http', function($http){
                       return $http.get('/api/hasAccess');
                   }]
               },
               controller: ['$log', 'immediate', 'async', 
                    function($log, immediate, async){
                        $log.log('Immediate is ', immediate);
                        $log.log('Server returned for async', async);
                    }
               ]
           })
       }]);