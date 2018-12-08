angular.module('Angello.Storyboard')
       .directive('dragContainer', function(){
            return {
                restrict: 'A',            
                controller: 'DragContainerController',
                controllerAs: 'dragContainer',
                link: function($scope, $element, $attrs, dragContainer){
                    dragContainer.init($element);
                    
                    $element.on('dragstart', dragContainer.handleDragStart.bind(dragContainer));
                    $element.on('dragend', dragContainer.handlerDragEnd.bind(dragContainer));
                    $scope.$watch($attrs.dragContainer, dragContainer.updateDragData.bind(dragContainer));
                    //we use $observe instead of $watch because the value we're watching is evaluated as text, not an actual Angular expression.
                    $attrs.$observe('mimeType', dragContainer.updateDragType.bind(dragContainer)); 
                    $attrs.$set('draggable', true);
                 }
            }
       }).controller('DragContainerController', function($dragging){
           dragContainer.handleDragStart = function(e){
               if(e.originEvent){
                   e = e.originEvent;
               }
               e.dataTransfer.dropEffect = 'move';
               e.dataTransfer.effectAllowed = 'move';

               dragContainer.el.addClass('drag-container-active');
               dragContainer.dragging = true;

               $dragging.setData(dragContainer.data);
               $dragging.setType(dragContainer.type)
           };

           dragContainer.handleDragEnd = function(e){
               if(e.originEvent){
                   e = e.originEvent;
               }

               angular.element(e.target).removeClass('drag-active');
               
               dragContainer.el.removeClass('drag-container-active');
               dragContainer.dragging = false;

               $dragging.setData(null);
               $dragging.setType(null);
           };

           dragContainer.updateDragData = function(data){
               dragContainer.data = data;
               if(dragContainer.dragging){
                   $dragging.setData(dragContainer.data);
               }
           };

           dragContainer.updateDragType = function(type){
               dragContainer.type = type || 'text/x-drag-and-drop';
               if(dragContainer.dragging){
                   $dragging.setType(dragContainer.type);
               }
           };
       });

angular.module('Angello.Storyboard')
       .directive('dropContainer', function($docment, $parse){
           return {
               restrict: 'A',
               controller: 'DropContainerController',
               controllerAs: 'dropContainer',
               link: function($scope, $element, $attrs, dropContainer){
                   var bindTo = function(event){
                       return function(e){
                           return $scope.$apply(function(){
                               return dropContainer['handle0 + event'](e);
                           });
                       };
                   };

                   var dragEnd = dropContainer.handleDragEnd.bind(dropContainer);
                   var handleDragEnter = bindTo('DragEnter');
                   var handleDragOver = bindTo('DragOver');
                   var hanldeDragLeave = bindTo('DragLeave');
                   var handleDrop = bindTo('Drop');

                   dropContainer.init($element, $scope, {
                       onDragEnter: $parse($attrs.onDragEnter),
                       onDragOver: $parse($attrs.onDragOver),
                       onDragLeave: $parse($attrs.onDragLeave),
                       onDrop: $parse($attrs.onDrop)
                   });

                   $element.on('dragenter', handleDragEnter);
                   $element.on('dragover', handleDragOver);
                   $element.on('dragleave', handleDragLeave);
                   $element.on('drop', handDrop);

                   $scope.$watch($attrs.accepts, dropContainer.updateMimeTypes.bind(dropContainner));
                   $document.on('dragend', dragEnd);
                   $scope.$on('$destroy', function(){
                       $document.off('dragend', dragEnd);
                   });
               }
           };
       });