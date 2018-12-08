/* Using the $routeParams service */
angular.module('routingApp', ['ngRoute'])
       .config(['$routeProvider', function($routeProvider){
           $routeProvider.when('/', {
               template: '<h1>Main Page</h1>'
           }).when('/detail/:detId', {
               template: '<h2>Loaded {{myCtrl.detailId}}' + 
                 ' and query String is {{myCtrl.qStr}}</h2>',
               controller: ['$routeParams', function($routeParams){
                   this.detailId = $routeParams.detId;
                   this.qStr = $routeParams.q;
               }],
               controllerAs: 'myCtrl'
           });
       }]);
