var Render = function(folderRoot) {
	var obj = this;
	obj.renderContents(folderRoot);
};

Render.prototype.renderContents = function(celloFolderRootData) {
	var obj = this;
	console.log('renderContents');

	var jsonRootStr = JSON.stringify(celloFolderRootData);
	localStorage.setItem('jsonRoot', jsonRootStr);

	setTimeout(function() {
		document.location = '../?livedata=true'
	}, 2500);
	
};