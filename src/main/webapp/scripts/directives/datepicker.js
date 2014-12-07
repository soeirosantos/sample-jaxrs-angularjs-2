'use strict';

var DATE_REGEX = /^([1-9]|0[1-9]|[1,2][0-9]|3[0,1])\/([1-9]|1[0,1,2])\/(\d{4})$/;
angular.module('angularjaxrs').directive('date', function($parse, dateFilter) {
    return {
        restrict : "E",
        replace : true,
        transclude : false,
        require: '?ngModel',
        compile : function(element, attrs) {
            var modelAccessor = $parse(attrs.ngModel);

            var isRequired = "";
            if(attrs.required) {
                isRequired = "required";
            }
            var html = "<input id='" + attrs.id + "' name='" + attrs.name + "' type='text' " + isRequired + " class='form-control' placeholder='"+attrs.placeholder+"'></input>";

            var $newElem = $(html);
            element.replaceWith($newElem);

            var enhancedLinker = function(scope, element, attrs, ngModelCtrl) {
                if(!ngModelCtrl) return;
                
                var dateParser = function(value) {
                    if(value) {
                        var d = value.match(DATE_REGEX);
                        console.log(d);
                        if(d) {
                        	var formattedDate = d[2] + "-" + d[1] + "-" + d[3];
                        	console.log(formattedDate);
                            var date = new Date(Date.parse(formattedDate));
                            ngModelCtrl.$setValidity("dateFormat", true);
                            return date;
                        } else {
                            ngModelCtrl.$setValidity("dateFormat", false);
                            return;
                        }
                    }
                    return;
                }
                var dateFormatter = function(value) {
                    if(value) {
                        var date = dateFilter(value,"dd/MM/yyyy");
                        return date;
                    }
                    return;
                }
                
                ngModelCtrl.$parsers.unshift(dateParser);
                ngModelCtrl.$formatters.unshift(dateFormatter);

                element.bind("blur keyup change", function() {
                    scope.$apply(function() {
                        ngModelCtrl.$setViewValue(element.val());
                    });
                });

                ngModelCtrl.$render = function() {
                    element.val(ngModelCtrl.$viewValue);
                }
            }

            return enhancedLinker;
        }
    }
});