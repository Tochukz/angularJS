angular.module('GoogleChart')
        .factory('googleChartLoaderPromise', ['$q', '$rootScope', '$window', 
            function($q, $rootScope, $window) {
                //Create a Deferred Object
                var deferred = $q.defer();

                //Load Google Charts API asychronously
                $window.google.load('visualization', '1', {
                    packages: ['corechart'],
                    callback: function() {
                        //When loaded, trigger the resolve but inside an $apply as the event happens outside of AngularJS life cycle
                        $rootScope.$apply(function() {
                            deferred.resolve();
                        });
                    }
                });
                //Return the promise object for the directive to chain onto
                return deferred.promise;
            }]);

/**
 * Because the 'callback' is called outside the life cycle of AngularJS, we need to wrap it in a $rootScope.$apply function to ensure AngularJS knows to redraw 
 * the UI and run a complete digest cycle as needed.
 */