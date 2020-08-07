setTimeout(function() {
	$($('section')[0]).addClass('active');
}, 1000);

var section = 0;
var totalSections = 6;

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
	} else if (section == 2) {
		$('#nextBtn, #backBtn').show();
		$('.login-img').hide();
		$('section').removeClass('active');
		$($('section')[section]).addClass('active');
		$('.sections').addClass('three');
		$($('.white-bg')[0]).removeClass('show');
	} else if (section == 3) {
		$('section').removeClass('active');
		$($('section')[section]).addClass('active');
		$('.sections').addClass('four');
		$($('.white-bg')[0]).addClass('show');
		$($('.white-bg')[1]).removeClass('show');
		$('.nexus4-drive, .nexus7-drive').addClass('hide');
	} else if (section == 4) {
		$('.nexus4-drive, .nexus7-drive').removeClass('hide');
		setTimeout(function() {
			$('section').removeClass('active');
			$($('section')[section]).addClass('active');
		}, 0);
		setTimeout(function() {
			$($('.white-bg')[1]).addClass('show');
		}, 333)
		$('.sections').addClass('five');
	} else if (section == 5) {
		$('.nexus4-drive, .nexus7-drive').addClass('fade');
		setTimeout(function() {
			$('.nexus4-drive, .nexus7-drive').addClass('hide').removeClass(
					'fade');
		}, 500);
		$('section').removeClass('active');
		$($('section')[section]).addClass('active');
		$('.sections').addClass('six');
		$('.white-bg').removeClass('show');
		$('#nextBtn').html('Next &rsaquo;');
	} else if (section == 6) {
		$('section').removeClass('active');
		$($('section')[section]).addClass('active');
		$('.sections').addClass('seven');
		$('#nextBtn').text('Done');
	} else {
		section = 0;
		$('#backBtn').hide();
		$('section').removeClass('active');
		$($('section')[section]).addClass('active');
		$($('section')[0]).addClass('active');
		$('#nextBtn').html('Next &rsaquo;');
	}
}