setTimeout(function() {
	$($('section')[0]).addClass('active');
}, 1000);

function anim() {
	$('.monitor .screen').addClass('show');
	setTimeout(function() {
		$('.nexus4 .screen').addClass('show');
	}, 250);
	setTimeout(function() {
		$('.nexus7 .screen').addClass('show');
	}, 350);
	setTimeout(function() {
		$('.chromebook .screen').addClass('show');
	}, 450);
	setTimeout(function() {
		$('.screen').removeClass('show');
		setTimeout(function() {
			$('.screen').addClass('two');
			setTimeout(function() {
				$('.monitor .screen').addClass('show');
				setTimeout(function() {
					$('.nexus4 .screen').addClass('show');
				}, 250);
				setTimeout(function() {
					$('.nexus7 .screen').addClass('show');
				}, 350);
				setTimeout(function() {
					$('.chromebook .screen').addClass('show');
				}, 450);
				setTimeout(function() {
					$('.screen').removeClass('show');

					setTimeout(function() {
						$('.screen').removeClass('two').addClass('three');
						setTimeout(function() {
							$('.monitor .screen').addClass('show');
							setTimeout(function() {
								$('.nexus4 .screen').addClass('show');
							}, 250);
							setTimeout(function() {
								$('.nexus7 .screen').addClass('show');
							}, 350);
							setTimeout(function() {
								$('.chromebook .screen').addClass('show');
							}, 450);
							setTimeout(function() {
								$('.screen').removeClass('show');

								setTimeout(function() {
									$('.screen').removeClass('three').addClass(
											'four');
									setTimeout(function() {
										$('.monitor .screen').addClass('show');
										setTimeout(function() {
											$('.nexus4 .screen').addClass(
													'show');
										}, 250);
										setTimeout(function() {
											$('.nexus7 .screen').addClass(
													'show');
										}, 350);
										setTimeout(function() {
											$('.chromebook .screen').addClass(
													'show');
										}, 450);
										setTimeout(function() {
											$('.screen').removeClass('show');													
											setTimeout(function() {
												$('.screen').removeClass('four');
											}, 250);
											setTimeout(function() {
												anim();
											}, 2000);
										}, 2500);
									}, 500);
								}, 1000);
							}, 2500);
						}, 500);
					}, 1000);
				}, 2500);
			}, 500);
		}, 1000);
	}, 2500);
}

setTimeout(function() {
	anim();
}, 2000);