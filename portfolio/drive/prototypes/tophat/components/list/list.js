tophat.directive('duxList', function() {
	return {
		restrict : 'EA',
		transclude : true,
		templateUrl : 'components/list/list.html',
		replace : true,
		link : function($scope, element, attrs) {

		}
	};
});

var listMod = angular.module('listMod', [ 'ngAnimate' ]);

listCtrl = function($scope) {

	$scope.fileItems = [];
	$scope.folderItems = [];
	
	$scope.showNextScroll = true;
	$scope.folderOpen = false;

	$scope.getFileDisplayClass = function() {
		if ($scope.folderOpen == true) {
			return 'hide';
		} else {
			return '';
		}
	};

	$scope.getFolder = function() {
		$scope.populateFolder();
	}

	$scope.openFolder = function() {
		var folder = this.item;
		$scope.loadFolder(folder);
	};

	$scope.populateFolder = function() {
		var folder = dataHandler.root;
		$scope.loadFolder(folder);
	};
	
	$scope.loadFolder = function(folder) {
		var files = [];
		var folders = [];
		
		for (var i = 0; i < folder.contents.length; i++) {
			var item = folder.contents[i];
			if (item.type == 'folder') {
				folders.push(item);
			} else {
				files.push(item);
			}
		}
		
		$scope.fileItems = [];
		$scope.folderItems = [];
		
		setTimeout(function() {
			$scope.$apply(function() {
				$scope.fileItems = files;
				$scope.folderItems = folders;
			});
		}, 250);
		
		var breadcrumbScope = angular.element($('.breadcrumb')[0]).scope();
		breadcrumbScope.addBreadcrumb(folder);

	};

};

listMod.controller('listCtrl', [ '$scope', listCtrl ]);
