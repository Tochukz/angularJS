console.clear();

/* global angular */
(function(){
    'use strict';

    var app = angular.module('formlyExample', ['formly', 'formlyBootstrap'], function config(formlyConfigProvider){
        //set template here
        formlyConfigProvider.setType({
            name: 'custom',
            templateUrl: 'custom.html'
        });
    });


    app.controller('MainCtrl', function MainCtrl(formlyVersion){
        var vm = this;
        //function assignment
        vm.onSubmit = onSubmit;

        //variable assignment
        vm.author = { //optionally fil in your info below:
            name: 'Chucks D. P',
            url: 'https://twitter.com/chucks'
        };

        vm.exampleTitle = 'Introduction';
        
        vm.env ={
        angularVersion: angular.version.full,
        formlyVersion: formlyVersion
        };

        vm.model = {
            awesome: true
        };
        vm.options = {
            formState: {
                awesomeIsForce: false
            }
        };

        vm.fields = [
            {
                key: 'text',
                type: 'input',
                templateOptions: {
                    label: 'Text',
                    placeholder: 'Formly is terrific!'
                }
            },
            {
                key: 'nested.story',
                type: 'input',
                templateOptions: {
                    label: 'Some sweet story',
                    placeholder: 'It allows you to build and maintain yout form with the ease of JavaScript',
                    description: ''
                },
                expressionProperties: {
                    'templateOptions.focus': 'formSatte.awesomeIsForced',
                    'templateOptions.description': function(viewValue, modelvalue, scope){
                        if(scope.formState.awesomeIsForced){
                            return 'And look! This field magically got focus!';
                        }
                    } 
                }
            },
            {
                key: 'awesome',
                type: 'checkbox',
                templateOptions: {label: ''},
                expressionProperties: {
                    'templateOptions.diabled' : 'formState.awesomeIsForced',
                    'templateOptions.label': function(viewValue, modelValue, scope){
                        if(scope.formState.awesomeIsForced){
                            return 'Too bad, formly is readlly awesome...';
                        }else{
                            return 'Is formly totally awesome? (uncheck this and see what happens)';
                        }
                    }
                }

            },
            {
                key: 'whynot',
                type: 'textarea',
                expressionProperties : {
                    'templateOptions.placeholder': function(viewValue, modelValue, scope){
                        if(scope.formSatte.awesomeIsForced){
                            return 'Too bad ... It really is awesoem! wasn\'t that cool?';
                        }else{
                            return 'Type in here... I dare you';
                        }
                    },
                    'templateOptions.disabled': 'formState.awesomeIsForced'
                },
                hideExpression: 'model.awesome',
                templateOptions: {
                    label: 'Why Not?',
                    placeholder: 'Type in here... I dare you'
                },
                watcher: {
                    listener: function (field, newValue, oldValue, formScope, stopWatching){
                        if(newValue){
                            stopWatching();
                            formScope.model.awesome = true;
                            formScope.model.whyNot = undefined;
                            field.hideExpression = null;
                            formScope.options.formState.awesomeIsForced = true;
                        }
                    }
                }
                
            },{
                key: 'custom',
                type: 'custom',
                templateOptions: {
                    labenl: 'Custom inline',
                }
            },{
                key: 'exampleDirective',
                template: '<div example-directive></div>',
                templateOptions: {
                    label: 'Exapple Directive',
                }
            }
        ];

        // function definition
        function onSubmit(){
            alert(JSON.stringify(vm.model), null, 2);
        }
    });

    app.directive('exampleDirective', function(){
        return {
            templateUrl: 'example-directive.html'
        };
    })
})();