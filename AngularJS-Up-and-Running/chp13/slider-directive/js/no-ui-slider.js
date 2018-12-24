angular.module('SliderApp')
       .directive('noUiSlider', [function(){
           return {
               restrict: 'E',
               require: 'ngModel',
               link: function($scope, $element, $attr, ngModelCtrl){
                   $element.noUiSlider({
                       //We might not have the initial value in ngModelCtrl yet
                       start: 0,
                       range: {
                           //$attrs by default gives us string values
                           //slider expects numbers, so convet
                           min: Number($attr.rangeMin),
                           max: Number($attr.rangeMax)
                       }
                   });
                
                   //When data changes inside AngularJS notify the third party directive of the change
                   ngModelCtrl.$render = function() {
                       $element.val(ngModelCtrl.$viewValue);
                   };

                   //When data changes outside of AngulerJS 
                   $element.on('set', function(args) {
                       //Also tell AngularJ that it needs to update the UI
                       $scope.$apply(function() {
                           //Set the data within AngularJS
                           ngModelCtrl.$setViewValue($element.val());
                       });
                   });
               }
           };
       }]);

/**
 * AngularJS calls the $render method whenever the model value changes inside AngularJS (for example, when it is initialized to a value in our controller).
 */