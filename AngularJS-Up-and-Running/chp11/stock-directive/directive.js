angular.module('stockMarketApp')
       .directive('stockWidget', [function(){
            return {
                templateUrl: 'stock.html',
                restrict: 'AE',
                scope: {
                    stockData: '=stockData'
                },
                link: function($scope, $element, $attrs){
                    $scope.getChange = function(stock) {
                        return Math.ceil(((stock.price - stock.previous)/ stock.previous) *100 );
                    };
                }
            };
        }]);

/*
 * If the attribute used to pass data to the directive is normalized to the same name as the key of the scope object, you can simplify the mapping.
 * For example the attribute used in <div stock-widget stock-data="s"></div> widget in index.html to pass data to the directive is 'stock-data'. This
 * is normalized to 'stockData' by angularJS so to map the data passed to stock-data attribute we can simple do 
 *  scope: {
 *      stockData: '='
 *  }
 *  instead of
 *  scope: {
 *       stockData: '=stockData'
 *  }
 * which functions exactly the same, but since the key is same as the expected value after the '='.
 */