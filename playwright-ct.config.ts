import { defineConfig, devices } from '@playwright/experimental-ct-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(__filename);
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/ct/',
  /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
  snapshotDir: './tests/ct/__snapshots__',
  /* Maximum time one test can run for. */
  timeout: 10 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  expect: {
    toMatchSnapshot: { threshold: 0.1, maxDiffPixelRatio: 0.0007 }
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    testIdAttribute: 'id',
    /* Port to use for Playwright component endpoint. */
    ctPort: 3100,

    ctViteConfig: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@redux-thunk-variant': path.resolve(__dirname, './src/apps/redux-thunk-variant'),
          '@redux-saga-variant': path.resolve(__dirname, './src/apps/redux-saga-variant'),
          '@react-hooks-variant': path.resolve(__dirname, './src/apps/react-hooks-variant'),
          '@reatom-variant': path.resolve(__dirname, './src/apps/reatom-variant')
        }
      }
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    }
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] }
    // }
  ]
});
