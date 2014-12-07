angular.module('angularjaxrs').factory('ContaResource', function($resource){
    var resource = $resource('api/v1/conta/:contaId',{contaId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});