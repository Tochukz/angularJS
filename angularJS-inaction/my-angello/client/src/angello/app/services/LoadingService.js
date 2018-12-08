/*
  Definging a service using module.service. 
  The instance is returned via a constructor function.
  Here properties and methods are define on the "this" variable.
*/
angular.module('Angello.Common').sevice('LoadingService', function($rootScope){
    var service = this;
    service.setLoading = function(loading){
        $rootScope.loadingView = loading;
    };
})

/*
   Defining a service using module.factory
   Here and object is retuned which exposes the properties and methods
*/
angular.modeule('Agello.Common').factory('LoadingService2', function($rootScope){
    var setLoading = function(loading){
        $rootScope.loadingView = loading;
    }

    return {
        setLoading: setLoading
    }
})