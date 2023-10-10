

function navToPortfolio() {
  if (prompt('Enter term to continue.') == 'view') {
		document.location = 'https://docs.google.com/presentation/d/17O-p2snz16KqM6i0HenyDSWs_qWy9hg0qp_q4p2rbwA/edit?usp=sharing';
	};
}

var buttons = document.querySelectorAll('button');
for (let i = 0; i < buttons.length; i++) {
	let button = buttons[i];
	button.addEventListener('click', function() {
		navToPortfolio();
	});
}
