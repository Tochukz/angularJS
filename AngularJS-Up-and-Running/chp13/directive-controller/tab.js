angular.module('StockMarketApp')
       .directive('tab', [function(){
           return {
               restrict: 'E',
               transclude: true,
               template: '<div ng-show="selected" ng-transclude></div>',
               require: '^tabs',
               scope: true,
               link: function($scope, $element, $attr, tabsCtrl){
                   tabsCtrl.registerTab($attr.title, $scope);
               }
           };
       }]);

/**
 * Possible options for the require key of the directive definition object: 
 * require: 'tabs'   => implies that AngularJS should locate the directive tabs on the same element, and throw an error if it’s not found.
 * require: '?tabs'  => implies that AngularJS should try to locate the directive tabs on the same element, but pass null as the fourth argument to the link function if it isn’t found.
 * require: '^tabs'  => tells AngularJS that the tabs directive must be present on one of the parent elements (not necessarily the immediate parent).
 * require: '?^tabs' => We can also mix and match these prefixed.
 * require: ['tabs', 'ngModel'] => We can have an array of required directives.
 */