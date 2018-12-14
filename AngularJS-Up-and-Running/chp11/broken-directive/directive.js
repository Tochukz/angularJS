angular.module('BrokenApp')
       .directive('stockWidget', [function(){
           return {
               templateUrl: 'stock.html',
               restrict: 'A',
               scope:{
                  stockData: '='
               },
               link: function($scope, $element, $attrs){
                   $scope.getChange = function(stock) {
                       return Math.ceil(((stock.price - stock.previous) / stock.previous) * 100);
                   };

                   $scope.changeStock = function(){
                       //This will create a new reference thus disconnecting the controller's access to the object.
                       $scope.stockData = {
                           name: 'Directive Stock',
                           price: 500,
                           previous: 200
                       };
                   };
               }

           };
       }]);