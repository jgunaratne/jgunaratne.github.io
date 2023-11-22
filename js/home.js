function toggleLightbox(thumbnail) {
  let lightbox = document.querySelector('jg-lightbox');
  if (thumbnail) {
    lightbox.thumbnail = thumbnail.children[0];
  }
  lightbox.classList.toggle('open');
}

function adjustScreen(matchDesktop) {
  let nav = document.querySelector('jg-nav');
  let container = document.querySelector('.container');
  if (matchDesktop.matches) {
    nav.classList.add('open');
    container.classList.add('menu-open');
  }
}

function addAutoPlay() {
  let videos = document.querySelectorAll('video');
  videos.forEach(function (video) {
    video.setAttribute('autoplay', 'autoplay');
  });
}

var matchDesktop = window.matchMedia('(min-width: 1024px)');
document.addEventListener('DOMContentLoaded', function () {
  adjustScreen(matchDesktop);
  addAutoPlay();
});

document.querySelectorAll('.thumbnail').forEach(function (thumbnail) {
  thumbnail.addEventListener('click', function () {
    toggleLightbox(thumbnail);
  });
});

document.querySelectorAll('jg-mobile').forEach(function (elem) {
  elem.addEventListener('click', function () {
    toggleLightbox(elem);
  });
});

document.querySelectorAll('jg-desktop').forEach(function (elem) {
  elem.addEventListener('click', function () {
    toggleLightbox(elem);
  });
});
