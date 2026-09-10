# juniusg.com

Personal site and portfolio for Junius Gunaratne, served by GitHub Pages
from `master` at [juniusg.com](https://juniusg.com).

Static HTML, CSS and vanilla web components. There is no build step — what
is in the repository is what is served.

## Layout

```
index.html          Home page
case/               Case studies, one page each
case/encrypted/     Password-gated case study (ciphertext + shell page)
css/                shared.css + home.css + case.css
js/                 Web components and page scripts
img/  video/        Media
```

### CSS

Three files, each mobile-first with a single `@media (min-width: 1024px)`
block at the bottom:

- `shared.css` — custom properties, base typography, and everything used by
  both the home page and the case studies.
- `home.css` / `case.css` — layout specific to each page type.

Pages link them directly. Avoid `@import`: it serialises requests and was
previously costing three round trips before first paint.

### JavaScript

Every page loads exactly one script tag -- `<script type="module" src="/js/site.js">`.
`site.js` imports each component, and ES module resolution guarantees every
custom element is defined once. Add a new component by adding one import
there, not by editing six pages.

Asset paths are absolute (`/css/...`, `/js/...`, `/img/...`). The site is
served from the domain root, so this makes the head identical on every page
regardless of directory depth, and removes the class of bug where a
`../img/favicon.png` was wrong on a page nested two levels down.

- `jg-nav.js` — the nav drawer. `setOpen(bool)` keeps `aria-expanded` and
  the container offset in sync; call it rather than toggling the class.
- `jg-lightbox.js` — zoom overlay. It binds itself by delegation to
  `.thumbnail`, `.figure`, `jg-mobile` and `jg-desktop`, and creates its own
  host element if the page has none, so a page only needs to load the file.
- `jg-media.js` — plays videos only while they are in the viewport. Videos
  must ship with `preload="none"` and **without** `autoplay`.
- `jg-mobile.js` / `jg-desktop.js` — device frames around slotted media.
- `jg-password.js` — gate for the encrypted case study. Reads the
  ciphertext path from the host element's `src` attribute.
- `jg-footer.js` — renders a real `<footer>` with the current year, so the
  copyright cannot drift out of sync across pages again.
- `jg-analytics.js` — the Google Analytics snippet, defined once.

Page-specific behaviour keys off `document.body.dataset.page` (the home page
sets `data-page="home"`), since `site.js` is shared by every page.

## Working on the site

```sh
npm install                     # dev tooling only; the site ships as-is
npm run serve                   # then open http://localhost:8000
npm run format
```

Absolute asset paths mean the site must be served over HTTP from the repo
root -- opening `index.html` over `file://` will not load CSS or JS.

### Tests

`tests/site.spec.js` drives a real browser against every page at desktop and
mobile widths, checking that pages load without script or asset errors, that
custom elements upgrade, that images have alt text, that social metadata is
present, that no video loads eagerly, and that the nav and lightbox work by
keyboard.

```sh
npm test
npm run check                   # formatting + link resolution
```

In a container that already ships a Chromium build, point at it instead of
downloading one:

```sh
CHROMIUM_PATH=/path/to/chromium npm test
```

CI runs the static checks and the browser suite on every pull request and on
pushes to master.

## Adding media

Videos are the heaviest thing here, so before committing one:

1. Re-encode it — these are screen captures and compress well.
2. Add `muted loop playsinline preload="none"` and no `autoplay`.
3. Give images a real `alt`; `.figure` captions do not replace it.

`img/high/` and `video/high/` used to hold unreferenced high-resolution
duplicates (82MB). Don't reintroduce them — keep one encode per asset.
