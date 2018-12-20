angular.module('StockMarketApp')
       .directive('tabs', [function(){
           return {
               restrict: 'E',
               transclude: true,
               scope: true,
               template: '<div class="tab-headers">'+
                              '<div ng-repeat="tab in tabs" ng-click="selectTab($index)" ng-class="{selected: isSelectedTab($index), tab: true}">'+
                                  '<span ng-bind="tab.title"></span>'+
                              '</div>'+
                         '<div>'+
                         '<div ng-transclude></div>',
                controller: function($scope){
                    var currentIndex = 0;
                    $scope.tabs = [];
                    //This function will not be accessable from the directive's HTML cos it is not defined on $scope
                    this.registerTab = function(title, scope){
                        if($scope.tabs.length === 0){
                            scope.selected = true;
                        } else {
                            scope.selected = false;
                        }
                        $scope.tabs.push({title: title, scope: scope});
                    };

                    $scope.selectTab = function(index) {
                        currentIndex = index;
                        for(var i=0; i<$scope.tabs.length; i++){
                            $scope.tabs[i].scope.selected = currentIndex === i;
                        }
                    };

                    $scope.isSelectedTab = function(index) {
                        return currentIndex === index;
                    };
                }
           };
       }]);

/**
 * Directive controllers are used in AngularJS for inter-directive communication, while link functions are fully contained and specific to the directive instance.
 * By interdirective communication, we mean when one directive on an element wants to communicate with another directive on its parent or on the same element. 
 * This encompasses sharing state or variables, or even functions.
 * 
 * Whenever we need to communicate between child and parent directives, or between sibling directives, we should consider using directive controllers.
 * The controller can define functions that are specific to the directive instance by defining them on $scope and define the API or accessible functions and variables
 * by defining them on this or the controller’s instance.
 */