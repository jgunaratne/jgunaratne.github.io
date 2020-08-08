var browserHeight = $(window).height();
var browserWidth = $(window).width();

$(window).resize(function(e) {
	browserHeight = $(window).height();
	browserWidth = $(window).width();
	//console.log(browserHeight, browserWidth);
});

var scrollToTimeout;
var lastScrollTop = 0;
var scrollToLoc = 0;

$(document).scroll(function(e) {

	var scrollTop = $(document).scrollTop();
	// console.log(browserHeight, scrollTop);

	/*
	if (scrollToTimeout) {
		clearTimeout(scrollToTimeout);
	}
	
	if (lastScrollTop < scrollTop) {

		scrollToTimeout = setTimeout(function() {
			scrollToLoc = Math.ceil(scrollTop / browserHeight) * browserHeight;
			$('html, body').animate({
				scrollTop : scrollToLoc
			}, 250);
		}, 333);
		
	} else if (lastScrollTop >= scrollTop) {

		scrollToTimeout = setTimeout(function() {
			scrollToLoc = Math.floor(scrollTop / browserHeight) * browserHeight;
			$('html, body').animate({
				scrollTop : scrollToLoc
			}, 250);
		}, 333);
		
	}

	lastScrollTop = scrollToLoc;
	*/

	if (scrollTop < browserHeight / 2) {
		$('.drive-logo').removeClass('small').removeClass('fade-out');
		$('.shadow').removeClass('hide');
		$('.welcome-card .msg').addClass('fade-out');
	} else if (scrollTop > browserHeight / 2) {
		$('.drive-logo').addClass('small').removeClass('fade-out');
		$('.shadow').addClass('hide');
		$('.welcome-card .msg').removeClass('fade-out');
	}
	if (scrollTop > browserHeight * 1.025) {
		$('.drive-logo').addClass('fade-out');
		$('.keep-card .msg').removeClass('fade-out');
	} else {
		$('.keep-card .msg').addClass('fade-out');
	}
	
	if (scrollTop > browserHeight * 2) {
		$('.nexus4').addClass('menagerie');
	} else {
		$('.nexus4').removeClass('menagerie');
	}

	if (scrollTop < browserHeight * 2.8) {
		$('.device.nexus7, .device.small-nexus4').addClass('big');
		$('.laptop.device').addClass('from-right');
		$('.bring-card .msg').addClass('fade-out');
	} else if (scrollTop > browserHeight * 2.8) {
		setTimeout(function() {
			$('.laptop.device').removeClass('from-right');
			$('.bring-card .msg').removeClass('fade-out');
		}, 0);
		setTimeout(function() {
			$('.nexus7.device').removeClass('big');
		}, 100);
		setTimeout(function() {
			$('.small-nexus4.device').removeClass('big');
		}, 200);
	}

	if (scrollTop < browserHeight * 3.5) {
		$('.device.small-nexus4').removeClass('show-share');
	} else if (scrollTop > browserHeight * 3.5) {
		$('.device.small-nexus4').addClass('show-share');
	}

	if (scrollTop < browserHeight * 3.6) {
		$('.device.small-nexus4').removeClass('share-screen');
		$('.share-card .msg').addClass('fade-out');
	} else if (scrollTop > browserHeight * 3.6) {
		$('.device.small-nexus4').addClass('share-screen');
		$('.share-card .msg').removeClass('fade-out');
	}

});