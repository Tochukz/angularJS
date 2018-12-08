/*
 * Defining a service using the provider method module.provider()
 * 
 */
function ItemService(opt_items){
    var items = opt_items || [];

    this.list = function(){
        return items;
    }

    this.add = function(item){
        items.push(item);
    }
}
angular.module('notesApp', [])
       .provider('ItemService', function(){ //Providers can not have dependenncies on ther services. Hence no [] is used here.
           var haveDefaultItems = true;

           this.disableDefaultItems = function(){
               haveDefaultItems =  false;
           }
           
           //This function  gets our dependencies, not the provider above.
           //This is what gets called when the service needs to be initialized.
           this.$get = [function(){
               var optItems = [];
               if(haveDefaultItems){
                   optItems = [
                        {id: 1, label: 'Item 0'},
                        {id: 2, label: 'Item 1'}
                   ]
               }
               return new ItemService(optItems);
           }]
       })
       .config(['ItemServiceProvider', 
           function(ItemServiceProvider){
               //To see how the provider can change configuration, change the value of shouldHaveDefaults to true and try running the example
               var shouldHaveDefaults = false;

               //Get configuration from server. Set shouldHaveDefaults somehow. Assume it magically changes for now
               if(!shouldHaveDefaults){
                   ItemServiceProvider.disableDefaultItems();
               }
           }
        ])
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
                   return ItemService.list();
               }

               self.add = function(){
                   ItemService.add({
                       id: self.list().length + 1,
                       label: 'Item '+ self.list().length
                   });

               };
           }
       ]);