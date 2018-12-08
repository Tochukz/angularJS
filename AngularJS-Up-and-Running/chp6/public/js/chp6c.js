/* Configuring $http defaults globally */
angular.module('notesApp', [])
       .controller('LoginCtrl', ['$http', 
           function($http){
               var self = this;
               self.user = {};
               self.message = 'Please login';
               self.login = function(){
                   $http.post('/api/login', self.user).then(
                       function(resp){
                           self.message = resp.data.msg;
                       }
                   );
               };
           }
      ]).config(['$httpProvider', function($httpProvider){
          $httpProvider.default.transformRequest.push(
              // Make every post object a query string
              function(data){
                  var requestStr;
                  if(data){
                      data = JSON.parse(data);
                      for(var key in data){
                          if(requestStr){
                              requestStr += '&' + key + '=' + data[key];
                          }else{
                             requestStr = key + '=' + data[key];
                          }
                      }
                  }
                  return requestStr;
              }
          );

          //Set the content type to be form type for all post request
          //This does not add it for GET requests
          $httpProvider.default.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

          /*
           AngularJS default to a content type of application/json
           If you can’t change your backend to accept application/json, then you can add a transformer and header to get your AngularJS application 
           talking to your backend.
          */
      }]);