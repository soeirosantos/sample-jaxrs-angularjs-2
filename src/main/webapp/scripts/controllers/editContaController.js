

angular.module('angularjaxrs').controller('EditContaController', function($scope, $routeParams, $location, ContaResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.conta = new ContaResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/conta");
        };
        ContaResource.get({contaId:$routeParams.contaId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.conta);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.conta.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/conta");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/conta");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.conta.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});