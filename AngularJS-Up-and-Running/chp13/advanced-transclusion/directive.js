angular.module('StockMarketApp')
       .directive('simpleStockRepeat', [function(){
           return {
               restrict: 'A',
               transclude: 'element',
               link: function($scope, $element, $attrs, crtl, $transclude){
                   var myArray = $scope.$eval($attrs.simpleStockRepeat);
                   var container = angular.element('<div class="container"></div>');
                   for(var i=0; i<myArray.length; i++){
                       //Create an element instance with a new child scope using the clone linking function
                       var instance = $transclude($scope.$new(), function(clonedElement, newScope){
                           //Expose custome variable for the instance
                           newScope.currentIndex = i;
                           newScope.stock = myArray[i];
                       });
                       //Add it to out container
                       container.append(instance);
                   }
                   //With transclude: 'element', the element gets replaced with a comment. 
                   //Add out generated coontent after the comment
                   $element.after(container);
               }
           };
       }]);

/* Here a some important point in the directive defintion object:
 * transclude: 'element', //Capture and replace the entire element instead of just its content
 * A $transclude is passed in as the fifth argument to the link function. 
 * $trasnclude in a function that allows us to create new instances of our template as many times as needed depending on our use case. The function takes an 
 * optional scope (if a new scope is needed for the element; otherwise, it inherits the directive’s scope) and a mandatory clone linking function as the second argument.
 * We create a new child scope i.e $scope.$new(). This is so that any modification made to the scope does not get reflected in the parent scope. This is always a good practice 
 * to make sure no global states step on each other.
 */