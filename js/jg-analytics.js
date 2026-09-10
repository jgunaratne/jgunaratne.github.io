// Google Analytics. Lives here rather than inline so the snippet exists once
// instead of being copy-pasted into all six pages.
const MEASUREMENT_ID = 'G-004WGNVXFH';

const tag = document.createElement('script');
tag.async = true;
tag.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
document.head.appendChild(tag);

window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', MEASUREMENT_ID);
