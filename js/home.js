// The nav drawer is pinned open on desktop and collapsed on smaller screens.
function adjustScreen(matchDesktop) {
  document.querySelector('jg-nav').setOpen(matchDesktop.matches);
}

const matchDesktop = window.matchMedia('(min-width: 1024px)');

document.addEventListener('DOMContentLoaded', function () {
  adjustScreen(matchDesktop);
});

matchDesktop.addEventListener('change', adjustScreen);
