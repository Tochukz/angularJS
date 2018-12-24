angular.module('SliderApp', [])
       .controller('MainCtrl', function(){
           var self = this;
           self.selectedValue = 2000;
           self.textValue = 4000;
           self.setSelectedValue = function(){
               self.selectedValue = self.textValue;
               console.log(self.selectedValue);
           };
       });