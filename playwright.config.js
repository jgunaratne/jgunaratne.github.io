// The site is static, so the tests just serve the repo and drive a browser.
export default {
  testDir: './tests',
  timeout: 60000,
  fullyParallel: true,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:8899',
    // 'chromium' selects the full browser rather than the headless shell.
    channel: 'chromium',
    // Containers that ship a system Chromium can point at it instead of
    // having Playwright download its own; CI just installs the normal one.
    ...(process.env.CHROMIUM_PATH
      ? { launchOptions: { executablePath: process.env.CHROMIUM_PATH } }
      : {}),
  },
  webServer: {
    command: 'python3 -m http.server 8899',
    url: 'http://localhost:8899',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 } } },
  ],
};
