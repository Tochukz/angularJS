/*
This example demonstrates the need for services.
We see that controller states have a very short life.
This is because Controllers are created and destroyed all the time.
The state contained in the controller will be reset when this is happens.
 */
angular.module('notesApp', [])
       .controller('MainCtrl', ['$log',
           function($log){
               var self = this;
               
               self.tab = 'first';
               
               self.open = function(tab){
                   self.tab = tab;
               };
           }
       ]).controller('SubCtrl', [
           function(){
               var self = this;

               self.list = [
                   {id: 1, label: 'Item 0'},
                   {id: 2, label: 'Item 1'}
               ];

               self.add = function(){
                   self.list.push({
                       id: self.list.length + 1,
                       label: 'Item '+ self.list.length
                   });
               };
           }
       ]);