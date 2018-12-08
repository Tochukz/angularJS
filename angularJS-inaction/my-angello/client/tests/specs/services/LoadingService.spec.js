describe('Loading Service', function(){
    var $rootScope, LoadingService;
    beforeEach(module('Angello.Common'));   
    beforeEach(inject(function(_$rootScope_, _LoadingService_){ //This is called underscore warpping
        $rootScope = _$rootScope_;
        LoadingService = _LoadingService_;       
        //The inject method knows to strip out the underscores and return the actual service
    }));
});

