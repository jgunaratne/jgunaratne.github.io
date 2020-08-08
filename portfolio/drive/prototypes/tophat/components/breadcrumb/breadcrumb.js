tophat.directive('duxBreadcrumb', function() {
	return {
		restrict : 'EA',
		transclude : true,
		templateUrl : 'components/breadcrumb/breadcrumb.html',
		replace : true,
		link : function($scope, element, attrs) {

		}
	};
});

var duxBreadcrumbMod = angular.module('duxBreadcrumbMod', [ 'ngAnimate' ]);
var duxBreadcrumbCtrl = function($scope) {
	
	$scope.breadcrumbs = [];
	$scope.addBreadcrumb = function(folder) {
		$scope.breadcrumbs.push(folder);
	};
	
	$scope.getBreadcrumb = function() {
		var currCrumb = this.crumb;
		var n = 0;
		for (var i = 0; i < $scope.breadcrumbs.length; i++) {
			if ($scope.breadcrumbs[i] == currCrumb) {
				n = i;
				break;
			}
		}
		$scope.breadcrumbs.splice(i, $scope.breadcrumbs.length - i);
		var listScope = angular.element($('.list-container')[0]).scope();
		$scope.loadFolder(currCrumb);
	};
	
	
	
};
duxBreadcrumbMod.controller('duxBreadcrumbCtrl', [ '$scope', duxBreadcrumbCtrl ]);