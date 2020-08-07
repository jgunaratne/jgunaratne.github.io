duxFileFunc = function() {
	return {
		restrict : 'EA',
		transclude : true,
		templateUrl : 'components/file/file.html',
		replace : true,
		link : function($scope, element, attrs) {
			element.on("click", function() {
				
			});
		}
	};
}

tophat.directive('duxFile', duxFileFunc);