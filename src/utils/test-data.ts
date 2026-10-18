/**
 * Centralized Test Data and Fixtures
 */
export const TestUsers = {
  standard: {
    username: "standard_user",
    password: process.env.SAUCE_PASSWORD || "secret_sauce",
  },
  lockedOut: {
    username: "locked_out_user",
    password: process.env.SAUCE_PASSWORD || "secret_sauce",
  },
  problem: {
    username: "problem_user",
    password: process.env.SAUCE_PASSWORD || "secret_sauce",
  },
  performanceGlitch: {
    username: "performance_glitch_user",
    password: process.env.SAUCE_PASSWORD || "secret_sauce",
  },
  invalid: {
    username: "invalid_user_999",
    password: "wrong_password_123",
  },
};

export const CheckoutInfo = {
  validCustomer: {
    firstName: "Alex",
    lastName: "Morgan",
    postalCode: "94105",
  },
  missingPostal: {
    firstName: "Alex",
    lastName: "Morgan",
    postalCode: "",
  },
};

export const Products = {
  backpack: "Sauce Labs Backpack",
  bikeLight: "Sauce Labs Bike Light",
  boltTShirt: "Sauce Labs Bolt T-Shirt",
  fleeceJacket: "Sauce Labs Fleece Jacket",
};
