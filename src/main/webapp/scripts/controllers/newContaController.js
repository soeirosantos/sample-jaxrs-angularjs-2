
angular.module('angularjaxrs').controller('NewContaController', function ($scope, $location, locationParser, ContaResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.conta = $scope.conta || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/conta/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        ContaResource.save($scope.conta, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/conta");
    };
});