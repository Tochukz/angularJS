angular.module('DynamicFormApp')
       .directive('formElement', [function(){
           return {
               restrict: 'E',
               require: '^form',
               scope: true,
               compile: function($element, $attrs) {
                   var expectedInputAttrs = {
                       'required': 'required',
                       'ng-minlength': 'ngMinlength',
                       'ng-pattern': 'ngPattern'
                       //More here to be implemented
                   };

                   //Start extractng content from the HTML
                   var validationKeys = $element.find('validation');
                   var presentValidationKeys = {};
                   var inputName = $attrs.name;
                   angular.forEach(validationKeys, function(validationKey) {
                       validationKey = angular.element(validationKey);
                       presentValidationKeys[validationKey.attr('key')] = validationKey.text();
                   });

                   //Start generating final element HTML
                   var elementHtml = '<div>'+
                                          '<label>' + $attrs.label + '</label>';
                       elementHtml += '<input type="' + $attrs.type + ' " name=" ' + inputName + ' " ng-model=" '+ $attrs.bindTo + ' " ';
                       $element.removeAttr('type');
                       $element.removeAttr('name');
                       for(var i in expectedInputAttrs) {
                           if ($attrs[expectedInputAttrs[i]] !== undefined) {
                               elementHtml += ' ' + i + ' = "' + $attrs[expectedInputAttrs[i]] + ' " ';
                           }
                           $element.removeAttr(i);
                       }
                       elementHtml += '>';
                       elementHtml += '<span ng-repeat="(key, text) in validtors" ' + 'ng-show="hasError(key)" ' + ' ng-bind="text"></span>';
                       elementHtml += '</div>';
                       $element.html(elementHtml);

                       return function($scope, $element, $attrs, formCtrl) {
                           $scope.validators = angular.copy(presentValidationKeys);
                           $scope.hasError = function(key) {
                               return !!formCtrl[inputName]['$error'][key];
                           };
                       };
               }
           };
       }]);

/**
 * The compile step in a directive is the correct place to do any sort of HTML template manipulation and DOM transformation. We never use the link and 
 * compile functions together, because when we use the compile key, we have to return a linking function from within it instead.
 * The compile function executes before the scope is available, so it does not get the scope injected in.
 * 
 * Because we will be adding AngularJS directives dynamically, we are doing this in the compile. If we do this in the link step, AngularJS won’t detect these 
 * directives and our application won’t work.
 * 
 * AngularJS Convenience Functions:
 * angular.forEach => Iterator over objects and arrays
 * angular.fromJson(json) => Deserializes a JSON string. Argument 'json' is the json string to deserialize. Returns object|array|string|number
 * angular.toJson(obj, pretty) => Serializes input into a JSON-formatted string. Argument 'obj' is the input ti be serialized, it could be object, array, date, 
 *                                 string, nummber boolean. 'pretty' could be number or boolean
 * angular.copy => Performs a deep copy
 * angular.equals => Determines if two objects, regular expresssions, arrays or values are equals. Does deep comparison in the casee of oobjects or arrays.
 * angular.isObject
 * angular.isFunction 
 * etc
 * 
 * As mentioned before, compile is only used in the rarest of cases, where you need to do major DOM transformations at runtime. 
 * In a majority of cases, you might be able to accomplish the same with transclusion, or pure link function. But it does give you that
 * extra flexibility when you need it.
 */