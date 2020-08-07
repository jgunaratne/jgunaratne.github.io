setTimeout(function() {
	$($('section')[0]).addClass('active');
}, 1000);

var section = 0;
var totalSections = 2;

$('#nextBtn').on('click', next);
$('section').on('click', next);
$('#backBtn').on('click', prev).hide();

function next() {
	section++;
	showSection();
	$('.progress .bar').css('width', ((section / totalSections) * 100) + '%');
}

function prev() {
	section--;
	showSection();
	$('.progress .bar').css('width', ((section / totalSections) * 100) + '%');
}

function showSection() {
	$('.sections').removeClass('two').removeClass('three').removeClass('four')
			.removeClass('five').removeClass('six').removeClass('seven');
	if (section >= 1) {
		$('#backBtn').show();
	} else {
		$('#backBtn').hide();
	}
	$('.login-img').hide();

	if (section == 1) {
		$('section').removeClass('active');
		$($('section')[section]).addClass('active');
		$('.sections').addClass('two');
		$('#nextBtn, #backBtn').hide();
		setTimeout(function() {
			$('.login-img').show();
		}, 500);
		$('#advSettings').hide();
	} else if (section == 2) {
		$('#nextBtn, #backBtn').show();
		$('.login-img').hide();
		$('section').removeClass('active');
		$($('section')[section]).addClass('active');
		$('.sections').addClass('three');
		$($('.white-bg')[0]).removeClass('show');
		$('#advSettings').show();
		$('#nextBtn').text('Done');
	} else if (section == 3) {
		$('section').removeClass('active');
		$($('section')[section]).addClass('active');
		//$('.sections').addClass('seven');
		$('.section-container, .bottom-nav').hide();
	} else {
		section = 0;
		$('#backBtn').hide();
		$('section').removeClass('active');
		$($('section')[section]).addClass('active');
		$($('section')[0]).addClass('active');
		$('#nextBtn').html('Next &rsaquo;');
	}
}