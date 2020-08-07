var tophat = angular.module('tophat', [ 'ngAnimate' ]);

tophatCtrl = function($scope) {
	$scope.navTop = 'sections/nav-top.html';
	$scope.navLeft = 'sections/nav-left.html';

	$scope.sections = [ [ 'Home', 'sections/home.html', 'home' ],
			[ 'Folders', 'sections/folders.html', 'folders' ],
			[ 'Documents', 'sections/docs.html', 'docs' ],
			[ 'Photos', 'sections/photos.html', 'photos' ],
			[ 'Settings', 'sections/settings.html', 'settings' ]];
	$scope.selectedSection = $scope.sections[1];

	$scope.selectSection = function(section) {
		$scope.selectedSection = section;
		if (section[0] == 'Folders') {
			$scope.loadFolderSection();
		}
	};
	
	$scope.loadFolderSection = function() {
		setTimeout(function() {
			angular.element($('.list-container')[0]).scope().populateFolder();
		}, 0);		
	};

	$scope.getItemClass = function(section) {
		return section === $scope.selectedSection ? 'selected' : undefined;
	};

	$scope.getItemIconClass = function(section) {
		return section[2];
	};

	$scope.leftNavOpen = true;
	$scope.toggleNavLeft = function() {
		$scope.leftNavOpen = !$scope.leftNavOpen;
	};
	
	$scope.getMenuPressedClass = function() {
		return false === !$scope.leftNavOpen ? 'pressed' : undefined;
	};

	$scope.getNavLeftClosedClass = function() {
		return false === $scope.leftNavOpen ? 'closed' : undefined;
	};

}

tophat.controller('topHatCtrl', [ '$scope', tophatCtrl ]);

dataHandler = new DataHandler();
dataHandler.init();

$(document).on('keydown', function(e) {
	if (e.keyCode == 67) {
		dataHandler.clearLocalStorage();
		setTimeout(function() {
			location.reload();
		}, 250);
	}
});