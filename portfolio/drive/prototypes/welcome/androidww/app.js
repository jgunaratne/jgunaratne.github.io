animateInCurve = 'spring(400,30,100)';
PSD.black.clip = true;
PSD.black.style.backgroundColor = '#000'

PSD['drive-logo'].opacity = 0;
PSD['swipe-up'].opacity = 0;
PSD['chevron'].opacity = 0;
PSD['nexus4-baby'].opacity = 0;
PSD['nexus4-share'].opacity = 0;

animateSpeed = "1080";
animateCurveSpeed = "200";
animateInCurve = "spring(400,30,200)";
scaleInCurve = "spring(600,25,200)";
animateOutCurve = animateInCurve;

var n = 0;

utils.delay(500, function() {
	PSD['drive-logo'].animate({
		properties : {
			opacity : 1
		},
		time : 500
	});
});

utils.delay(1000, function() {

	PSD['black'].animate({
		properties : {
			opacity : 0
		},
		curve : animateInCurve,
		time : '1000'
	});

	PSD['drive-logo'].animate({
		properties : {
			width : 472 / 4,
			height : 419 / 4,
			x : (768 / 2 - 472 / 4) / 2,
			y : 80,
			opacity : 1
		},
		curve : "linear",
		time : "300"
	});

	PSD['nexus4'].animate({
		properties : {
			y : 400,
		},
		curve : 'spring(300,30,100)',
		time : '1000'
	});

	PSD['swipe-up'].animate({
		properties : {
			opacity : 1
		},
		time : 250
	});

	utils.delay(300, function() {
		$('.welcome-msg').removeClass('fade-out');
	});

	n++;
});

PSD['black'].on('click', function(event) {
	goToCard();
});

PSD['swipe-up'].on('click', function(event) {
	goToCard();
});

PSD['chevron'].on('click', function(event) {
	goToCard();
});

function goToCard() {
	if (n == 1) {

		PSD['bg'].animate({
			properties : {
				"x" : -500,
			},
			curve : 'spring(400,30,100)',
			time : '1000'
		});

		PSD['drive-logo'].animate({
			properties : {
				opacity : 0
			},
			time : 250
		});

		PSD['nexus4'].animate({
			properties : {
				y : -200,
			},
			curve : 'spring(300,30,100)',
			time : '1000'
		});

		PSD['swipe-up'].animate({
			properties : {
				opacity : 0
			},
			time : 250
		});

		utils.delay(500, function() {
			PSD['chevron'].animate({
				properties : {
					opacity : 1
				},
				time : 250
			});
		});

		$('.msg').addClass('fade-out');
		$('.keep-msg').removeClass('fade-out');

		utils.delay(500, function() {
			PSD['upload'].animate({
				properties : {
					"x" : -35,
					"y" : 420,
					"width" : 310 / 2,
					"height" : 310 / 2
				},
				curve : 'spring(400,30,100)',
				time : '1000'
			});
		});

		n++;
	} else if (n == 2) {

		PSD['bg'].animate({
			properties : {
				"x" : -800,
			},
			curve : 'spring(400,30,100)',
			time : '1000'
		});

		PSD['nexus4'].animate({
			properties : {
				"x" : 60,
				"y" : 240,
				"width" : 638 / 7,
				"height" : 1202 / 7
			},
			curve : 'spring(300,30,100)',
			time : '1000'
		});

		PSD['laptop'].animate({
			properties : {
				"x" : 30,
				"y" : 40,
				"width" : 1148 / 2,
				"height" : 669 / 2
			},
			curve : 'spring(300,30,100)',
			time : '1000'
		});

		PSD['nexus7'].animate({
			properties : {
				"x" : -20,
				"y" : 120,
				"width" : 324 / 2,
				"height" : 561 / 2
			},
			curve : 'spring(300,30,100)',
			time : '1000'
		});

		PSD['upload'].animate({
			properties : {
				"x" : 15,
				"y" : 160,
				"width" : 0,
				"height" : 0,
				"opacity" : 0
			},
			curve : 'spring(400,30,100)',
			time : '1000'
		});

		utils.delay(500, function() {
			PSD['nexus4-baby'].animate({
				properties : {
					opacity : 1
				},
				curve : 'spring(300,30,100)',
				time : '250'
			});

			utils.delay(250, function() {
				PSD['nexus4'].animate({
					properties : {
						opacity : 0
					},
					curve : 'spring(300,30,100)',
					time : '250'
				});
			});

		});

		$('.msg').addClass('fade-out');
		$('.bring-msg').removeClass('fade-out');

		n++
	} else if (n == 3) {

		PSD['bg'].animate({
			properties : {
				"x" : -1200,
			},
			curve : 'spring(400,30,100)',
			time : '1000'
		});

		PSD['nexus4-baby'].animate({
			properties : {
				"x" : (768 - 638) / 4,
				"y" : -200,
				"width" : 638 / 2,
				"height" : 1202 / 2
			},
			curve : 'spring(300,30,100)',
			time : '1000'
		});

		utils.delay(500, function() {
			PSD['nexus4-share'].animate({
				properties : {
					opacity : 1
				},
				curve : 'spring(300,30,100)',
				time : '250'
			});
		});

		PSD['laptop'].animate({
			properties : {
				"x" : 30 + 600,
				"y" : 60,
				"width" : 1148 / 4,
				"height" : 669 / 4
			},
			curve : 'spring(300,30,100)',
			time : '1000'
		});

		PSD['nexus7'].animate({
			properties : {
				"x" : -20 - 300,
				"y" : 120,
				"width" : 324 / 4,
				"height" : 561 / 4
			},
			curve : 'spring(300,30,100)',
			time : '1000'
		});

		$('.msg').addClass('fade-out');
		$('.share-msg').removeClass('fade-out');

		n++
	}
}
