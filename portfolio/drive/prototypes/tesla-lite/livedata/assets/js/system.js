$(document).on('keydown', function(e) {
	if (e.keyCode == 82) {
		dataHandler.clearLocalStorage();
		setTimeout(function() {
			location.reload();
		}, 250);
	}
});

dataHandler = new DataHandler();
dataHandler.init();