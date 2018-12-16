angular.module('StockMarketApp')
       .directive('stockWidget', [function(){
           return {
               templateUrl: 'stock.html',
               restrict: 'A',
               transclude: true,
               scope:{
                   stockData: '='
               },
               link: function($scope, $element, $attrs){
                   $scope.getChange = function(stock){
                       return Math.ceil(((stock.price - stock.previous)/stock.previous) * 100);
                   }
               }
           };
       }]);
       
/**
 * The concept of transclusions to allow us to create reusable directives where each implementation might need to render a certain section of the UI differently.
 */