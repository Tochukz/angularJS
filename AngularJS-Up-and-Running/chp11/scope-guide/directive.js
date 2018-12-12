angular.module('DirectiveDemo')
        .directive('itemWidget', [function(){
           return {        
               restrict: 'E',
               scope: {
                   item: '=',
                   promo: '@',
                   pickMe: '&onSelect'
               },
               templateUrl: 'sales-item.html',
           };
       }]);

/**
 * Interpretation of the scope object?
 *
 * First key:value pair in scope is item : ‘=’. That means in HTML, the attribute name is item and it refers to an object which is JSON [since it is defined as ‘=’], 
 * passed from parent scope.
 *
 * Second key:value pair in scope is promo : ‘@’. That means in HTML, the attribute name is promo and it refers to a String [since it is defined as ‘@’], 
 * can be passed from parent scope.

 * Third key:value pair in scope is pickMe : ‘&onSelect’. That means in HTML, the attribute name is on-select and it refers to a function [since it is defined as ‘&’] 
 * from a specific controller.
 */