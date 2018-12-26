app.controller('ChildCtrl', ['$controller', '$scope', 
    function($controller, $scope){
        $controller('ParentCtrl', {$scope: $scope});
        this.person = $scope.user;
    }
]);