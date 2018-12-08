angular.module('notesApp', [])
       .controller('MainCtrl', [
           function(){
               var self = this;
               
               self.tab = 'first';
               
               self.open = function(tab){
                   self.tab = tab;
               };
           }
       ]).controller('SubCtrl', ['ItemService',
           function(ItemService){
               var self = this;
               
               self.list = function (){
                   return ItemService.items();
               }

               self.add = function(){
                   ItemService.add({
                       id: self.list().length + 1,
                       label: 'Item '+ self.list().length
                   });

               };
           }
       ]);
    //    .factory('ItemService', [
    //        function(){
    //            var items = [
    //               {id: 1, label: 'Item 0'},
    //               {id: 2, label: 'Item 1'}
    //            ];
           

    //            return {
    //               items: function(){
    //                   return items;
    //               },
    //               add: function(item){
    //                   items.push(item);
    //               }
    //            }
    //        }
    //    ]);

    
    /*Defining the same service using module.service() instead of module.factory() */
    angular.module('notesApp')
           .service('ItemService', [
                function(){
                    var items = [
                        {id: 1, label: 'Item 0'},
                        {id: 2, label: 'Item 1'}  
                    ];

                    this.items = function(){
                       return items;
                    };

                    this.add = function(item){
                        items.push(item)
                    }
                }
           ]);