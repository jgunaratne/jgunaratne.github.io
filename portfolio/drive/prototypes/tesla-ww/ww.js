var cards = document.querySelectorAll('.card');
cards[0].style.display = 'block';
document.getElementById('prevBtn').style.display = 'none';

var currCard = 0;

function hideCards() {
	for (var i = 0; i < cards.length; i++) {
		cards[i].style.display = 'none';
	}
}

document.getElementById('nextBtn').onclick = function() {
	currCard++;
	hideCards();
	cards[currCard].style.display = 'block';
	if (currCard == 3) {
		document.getElementById('nextBtn').style.display = 'none';
	}
	document.getElementById('prevBtn').style.display = 'block'
}

document.getElementById('prevBtn').onclick = function() {
	currCard--;
	hideCards();
	cards[currCard].style.display = 'block';
	if (currCard < 1) {
		document.getElementById('prevBtn').style.display = 'none';
	}
	document.getElementById('nextBtn').style.display = 'block';
}