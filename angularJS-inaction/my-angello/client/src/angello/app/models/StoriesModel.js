angular.module('Angello.Common')
       .services('StoriesModel', function($http, EndpointConfigService, UtilsService, $q){
            var service = this,
                MODEL = '/stories/';
            /*
            service.all = function(){
                return $http.get(
                            EndpointConfigService.getUrl( 
                                MODEL + EndpointConfigService.getCurrentFormat()
                            )
                        ).then(function(result){
                            return  UtilsService.objectToArray(result);
                        });
            };
            */
            service.all = function(){
                var deferred = $q.defer();
                if(service.stories){
                    deferred.resolve(service.stories);
                }else{
                    $http.get(
                            EndpointConfigService.getUrl(
                                MODEL + EndpointConfigService.getCurrentFormat()
                            )
                          ).success(function(data, status, headers, config){
                              service.stories = data;
                              deferred.resolve(service.stories);
                          }).error(deferred.reject)
                }
                return deferred.promise;
            };

            service.fetch = function(story_id){
                return $http.get(
                       EndpointConfigService.getUrlForId(MODEL, story_id)
                    );
                
            };

            service.create = function(story){
                return $http.post(
                    EndpointConfigService.getUrl(
                        MODEL + EndpointConfigService.getCurrentFormat()), story
                    );
            };

            service.update = function(story_id, story){
                return $http.put(
                    EndpointConfigService.getUrlForId(MODEL, story_id), story
                );
            };

            service.destroy = function(story_id){
                return $http.delete(
                    EndpointConfigService.getUrlForId(MODEL, story_id)
                );
            }
        });

//$http.sucess and $http.error method signature.
var response = $http.get(url)
                    .success(function(data, status, header, config){
                               //Handle success here
                    }).error(function(data, status, headers, config){
                               //Handle error here
                    });
//This is a convenient alternative if you need to perform extra logic specific to the HTTP call.

//Usinng .then(), .catch() and finally()
var response2 = $http.get(url)
                     .then(function(result){
                        //Handle success here
                     }).catch(function(error){
                         //Handle error here
                     }).finally(function(){
                         //Get executed no matter what
                     });
//This new syntax works better to articulate exactlywhat’s going on