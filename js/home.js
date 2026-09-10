// Home-page behaviour only. site.js is shared by every page, so this guards
// on an explicit marker rather than pinning the nav open on the case studies.
if (document.body?.dataset.page === 'home') {
  const matchDesktop = window.matchMedia('(min-width: 1024px)');

  // The nav drawer is pinned open on desktop and collapsed on smaller screens.
  const adjustScreen = (mq) => document.querySelector('jg-nav').setOpen(mq.matches);

  document.addEventListener('DOMContentLoaded', () => adjustScreen(matchDesktop));
  matchDesktop.addEventListener('change', adjustScreen);
}
