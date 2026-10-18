import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { TestUsers } from '../utils/test-data';

/**
 * Fixture Types definitions
 * Provides automatic page object instantiation & test lifecycle injection
 */
type CustomFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authenticatedUser: { page: Page; inventoryPage: InventoryPage };
};

export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  /**
   * Pre-authenticated fixture (Simulates TestNG @BeforeMethod / Cucumber Given step)
   * Lands directly on the inventory page with standard user credentials
   */
  authenticatedUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(TestUsers.standard.username, TestUsers.standard.password);
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.pageTitle).toHaveText('Products');
    await use({ page, inventoryPage });
  },
});

export { expect };
