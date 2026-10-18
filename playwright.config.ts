import { defineConfig, devices } from "@playwright/test";

/**
 * Enterprise Playwright Configuration
 * Supports Local execution and CI/CD pipelines
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only to combat network blips */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI if limited CPU, or scale workers */
  workers: process.env.CI ? 2 : undefined,
  /* Reporters: List for terminal output, HTML without auto-open */
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
  ],
  /* Shared settings for all projects */
  use: {
    baseURL: process.env.BASE_URL || "https://www.saucedemo.com",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  /* Browser projects */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
