import { test, expect } from '@playwright/test';

const PAGES = [
  '/',
  '/case/live.html',
  '/case/bard.html',
  '/case/reddit.html',
  '/case/ads.html',
  '/case/material.html',
];

// Externals (fonts, the icon CDN, analytics) are not this site's concern.
// Media requests abort by design when a video scrolls out of view and
// jg-media pauses it.
const IGNORED = /fonts\.googleapis|fonts\.gstatic|jsdelivr|googletagmanager|ERR_ABORTED/;
// Resource load failures are asserted through the requestfailed handler
// below, which knows the URL and so can tell a local asset from a CDN. The
// matching console message carries no URL, so it would only ever be noise.
const CONSOLE_NOISE = /Failed to load resource/;

// networkidle would wait on multi-megabyte media that jg-media deliberately
// defers, so wait for the components to upgrade instead -- that is the real
// signal that the page is ready to assert against.
async function ready(page, path) {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(
    () => !!customElements.get('jg-nav') && !!customElements.get('jg-footer'),
  );
}

function collectProblems(page) {
  const problems = [];
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    const text = m.text();
    if (m.type() === 'error' && !IGNORED.test(text) && !CONSOLE_NOISE.test(text))
      problems.push(`console: ${text}`);
  });
  page.on('requestfailed', (r) => {
    const url = r.url();
    if (url.startsWith('http://localhost') && !IGNORED.test(r.failure()?.errorText ?? ''))
      problems.push(`request failed: ${url}`);
  });
  return problems;
}

for (const path of PAGES) {
  test.describe(path, () => {
    test('loads without script or asset errors', async ({ page }) => {
      const problems = collectProblems(page);
      await ready(page, path);
      expect(problems).toEqual([]);
    });

    test('every custom element upgrades', async ({ page }) => {
      await ready(page, path);
      const undefinedElements = await page.evaluate(() =>
        ['jg-nav', 'jg-footer', 'jg-lightbox'].filter((n) => !customElements.get(n)),
      );
      expect(undefinedElements).toEqual([]);
    });

    test('images all have alt text', async ({ page }) => {
      await ready(page, path);
      const missing = await page.evaluate(() =>
        Array.from(document.images)
          .filter((i) => !i.alt)
          .map((i) => i.getAttribute('src')),
      );
      expect(missing).toEqual([]);
    });

    test('carries description and social metadata', async ({ page }) => {
      await ready(page, path);
      for (const selector of [
        'meta[name="description"]',
        'meta[property="og:title"]',
        'meta[property="og:image"]',
        'link[rel="canonical"]',
      ]) {
        await expect(page.locator(selector)).toHaveCount(1);
      }
    });

    test('renders a footer with the current year', async ({ page }) => {
      await ready(page, path);
      const footer = page.locator('jg-footer > footer');
      await expect(footer).toContainText(String(new Date().getFullYear()));
    });

    test('no video autoplays, and offscreen video stays paused', async ({ page }) => {
      await ready(page, path);
      // jg-media raises preload to 'auto' once a video scrolls into view, so
      // the invariant is the autoplay attribute plus offscreen playback --
      // not the live preload value, which is supposed to change.
      const autoplaying = await page.evaluate(
        () => document.querySelectorAll('video[autoplay]').length,
      );
      expect(autoplaying).toBe(0);

      const offscreenPlaying = await page.evaluate(
        () =>
          Array.from(document.querySelectorAll('video')).filter((v) => {
            const box = v.getBoundingClientRect();
            const offscreen = box.top > window.innerHeight * 3 || box.bottom < 0;
            return offscreen && !v.paused;
          }).length,
      );
      expect(offscreenPlaying).toBe(0);
    });

    test('nav toggles by keyboard and keeps aria-expanded in sync', async ({ page }) => {
      await ready(page, path);
      const before = await page.evaluate(() =>
        document.querySelector('jg-nav').classList.contains('open'),
      );
      // Whichever control is actually visible in the current state.
      const control = await page.evaluateHandle(() =>
        Array.from(
          document.querySelector('jg-nav').shadowRoot.querySelectorAll('.menu-control'),
        ).find((el) => el.offsetParent !== null),
      );
      await control.asElement().focus();
      await page.keyboard.press('Enter');
      const after = await page.evaluate(() =>
        document.querySelector('jg-nav').classList.contains('open'),
      );
      expect(after).toBe(!before);
      const aria = await page.evaluate(() =>
        document
          .querySelector('jg-nav')
          .shadowRoot.querySelector('.nav .menu-control')
          .getAttribute('aria-expanded'),
      );
      expect(aria).toBe(String(after));
    });

    test('lightbox opens on a media trigger and closes with Escape', async ({ page }) => {
      await ready(page, path);
      const trigger = page.locator('.thumbnail, .figure, jg-mobile').first();
      if ((await trigger.count()) === 0) test.skip();
      await trigger.click({ force: true });
      await expect(page.locator('jg-lightbox')).toHaveClass(/open/);
      await page.keyboard.press('Escape');
      await expect(page.locator('jg-lightbox')).not.toHaveClass(/open/);
    });
  });
}

test('home page pins the nav open on desktop only', async ({ page }, testInfo) => {
  await ready(page, '/');
  const open = await page.evaluate(() =>
    document.querySelector('jg-nav').classList.contains('open'),
  );
  expect(open).toBe(testInfo.project.name === 'desktop');
});

test('case pages do not pin the nav open', async ({ page }) => {
  await ready(page, '/case/live.html');
  const open = await page.evaluate(() =>
    document.querySelector('jg-nav').classList.contains('open'),
  );
  expect(open).toBe(false);
});
