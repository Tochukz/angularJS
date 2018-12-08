/**
 * Injecting an angularJS built in service, $log.
 * $log.log() will write  to the console.
 */
angular.module('notesApp', [])
       .controller('MainCtrl', ['$log',
           function($log){
               var self = this;
               self.logStuff = function(){
                   $log.log('The button was press');
               }
           }
       ]);