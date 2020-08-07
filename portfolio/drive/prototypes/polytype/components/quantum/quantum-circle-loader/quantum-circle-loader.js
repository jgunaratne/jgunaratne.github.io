(function() {
	Polymer('quantum-circle-loader', {
		ready: function() {
			var t = this;
			var bouncedelay = 'bouncedelay 1.5s infinite ease-in-out'

			setTimeout(function() {
				var b1 = t.$.bounce1;
				b1.style.webkitAnimation = bouncedelay;
			}, 0);

			setTimeout(function() {
				var b2 = t.$.bounce2;
				b2.style.webkitAnimation = bouncedelay;
			}, 375);

			setTimeout(function() {
				var b3 = t.$.bounce3;
				b3.style.webkitAnimation = bouncedelay;
			}, 750);

			setTimeout(function() {
				var b4 = t.$.bounce4;
				b4.style.webkitAnimation = bouncedelay;
			}, 1125);

		}
	});
})();