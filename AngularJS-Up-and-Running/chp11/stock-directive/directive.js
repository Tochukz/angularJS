angular.module('stockMarketApp')
       .directive('stockWidget', [function(){
            return {
                templateUrl: 'stock.html',
                restrict: 'AE',
                scope: {
                    stockData: '='
                },
                link: function($scope, $element, $attr){
                    $scope.getChange = function(stock) {
                        return Math.ceil(((stock.price - stock.previous)/ stock.previous) *100 );
                    };
                }
            };
        }]);