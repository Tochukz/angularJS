/* Defining an inteceptor */
angular.module('notesApp', [])
       .controller('MainCtrl', ['$http', 
           function($http){
                var self = this;
                self.items = [];
                self.newTodo = {};

                var fetchTodos = function(){
                    return $http.get('/api/note').then(
                        function(response){
                            self.items = reponse.data;
                        }, 
                        function(errRespone){
                            console.log('Error while fetching notes');  
                        }
                    );
                };

                fetchTodos();

                self.add = function(){
                    $http.post('/api/note', self.newTodo)
                         .then(fetchTodos)
                         .then(function(response){
                             self.newTodo = {};
                         });
                };
           }
        ]).factory('MyLoggingInterceptor', ['$q', 
            function($q){
                return {
                    request: function(config){
                        console.log('Request made with ', config);
                        return config; //contnue the request
                        //If an error, not allowed, or my custom condition,
                        //return $q.reject('Not allowed');
                    },
                    requestError: function(rejection){
                        console.log('Request error due to ', rejection);
                        //Continue to ensure tnat the next promise chain sees an error 
                        return $q.reject(rejection);
                        //Or handled successfully? 
                        //return someValue
                    },
                    response: function(reponse){
                        console.log('Reponse from server', response);
                        //return a promise
                        return response || $q.when(response);
                    },
                    responseError: function(rejection){
                        console.log('Error in response ', rejection);
                        //Continue to ensure that the next promise chain sees an error
                        //Can check auth status code here if need to 
                        //if(rejection.status === 403){
                            //Show a login dialog 
                            //return a value to tell controllers it has been handled
                       // }
                        //Or return a rejection to continue the promise failure chain
                        return $q.reject(rejection);
                    }
                };
            }
        ]).config(['$httpProvider', function($httpProvider){
            $httpProvider.interceptors.push('MyLoggingInterceptor');
        }]);

//Best practices: 
//1. wrap $http calls in services
angular.module('notesApp2', [])
      .factory('NoteService', ['$http',
            function($http){
                return {
                    query: function(){
                        return $http.get('/api/notes')
                    }
                };
            }
        ]);

//2. Use interceptor
//. A simple interceptor that handles 403s, as well as adds the authorization header on every request
angular.module('notesApp3', [])
       .factory('AuthInterceptor', ['AuthInfoService', '$q', function(AuthInfoService, $q){
           return {
               request: function(config){
                   if(AuthInfoService.hasAuthHeader()){
                       config.headers['Authorization'] = AuthInfoService.getAuthHeader();
                   }
                   return config;
               },
               responseError: function(responseRejection){
                   if(responseError.status === 403){
                       //Authorization issue, access forbiddden
                       AuthInfoService.redirectToLogin();
                   }
                   return $q.reject(responseRejection);
               }
           }
       }]).config(['$httpProvider', function($httpProvider){
           $httpProvider.interceptors.push('AuthInterceptor');
       }]);
//The Implementation of AuthInfoService can be as per the project needs


