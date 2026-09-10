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

Each `jg-*.js` file defines one custom element and is loaded with `defer`.

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

## Working on the site

```sh
python3 -m http.server 8000     # then open http://localhost:8000
npx prettier --write .          # formatting
```

CI runs Prettier in check mode and validates that every local `src`/`href`
resolves. Run both before pushing:

```sh
npx prettier --check .
python3 scripts/check-links.py
```

## Adding media

Videos are the heaviest thing here, so before committing one:

1. Re-encode it — these are screen captures and compress well.
2. Add `muted loop playsinline preload="none"` and no `autoplay`.
3. Give images a real `alt`; `.figure` captions do not replace it.

`img/high/` and `video/high/` used to hold unreferenced high-resolution
duplicates (82MB). Don't reintroduce them — keep one encode per asset.
