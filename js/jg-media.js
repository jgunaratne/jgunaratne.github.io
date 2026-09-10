// Plays videos only while they are on screen. The markup ships them with
// preload="none" and no autoplay, so nothing is fetched until it is needed --
// the home page alone references ~80MB of video.
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function prepare(video) {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.removeAttribute('autoplay');
    if (!video.hasAttribute('preload')) {
      video.preload = 'none';
    }
  }

  function observe(videos) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.preload = 'auto';
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: '200px 0px', threshold: 0.1 },
    );

    videos.forEach(function (video) {
      observer.observe(video);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const videos = Array.from(document.querySelectorAll('video'));
    videos.forEach(prepare);

    // With reduced motion the videos stay as still first frames, but they
    // still need a frame to show, so let the browser fetch metadata only.
    if (reduceMotion.matches) {
      videos.forEach(function (video) {
        video.preload = 'metadata';
        video.controls = true;
      });
      return;
    }

    observe(videos);
  });
})();
