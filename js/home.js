document.querySelector('.menu-control').addEventListener('click', function () {
  document.querySelector('jg-nav').classList.toggle('open');
  document.querySelector('.container').classList.toggle('menu-open');
});

function toggleLightbox(thumbnail) {
  let lightbox = document.querySelector('jg-lightbox');
  if (thumbnail) {
    lightbox.thumbnail = thumbnail.children[0];
  }
  lightbox.classList.toggle('open');
}

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

