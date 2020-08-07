duxFolderFunc = function() {
	return {
		restrict : 'EA',
		transclude : true,
		templateUrl : 'components/folder/folder.html',
		replace : true,
		link : function($scope, element, attrs) {

		}
	};
}

tophat.directive('duxFolder', duxFolderFunc);