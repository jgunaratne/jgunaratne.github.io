function adjustScreen(matchDesktop) {
  const nav = document.querySelector('jg-nav');
  const container = document.querySelector('.container');
  nav.classList.toggle('open', matchDesktop.matches);
  container.classList.toggle('menu-open', matchDesktop.matches);
}

const matchDesktop = window.matchMedia('(min-width: 1024px)');

document.addEventListener('DOMContentLoaded', function () {
  adjustScreen(matchDesktop);
});

matchDesktop.addEventListener('change', adjustScreen);
