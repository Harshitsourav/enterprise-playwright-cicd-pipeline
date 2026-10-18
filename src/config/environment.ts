/**
 * Centralized Environment Configuration
 */
export const Environment = {
  baseUrl: process.env.BASE_URL || "https://www.saucedemo.com",
  apiBaseUrl: process.env.API_BASE_URL || "https://reqres.in",
  defaultTimeout: 10000,
  navigationTimeout: 15000,
  isCI: !!process.env.CI,
};
