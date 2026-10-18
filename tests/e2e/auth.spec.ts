import { test, expect } from '../../src/fixtures/test.fixture';
import { TestUsers } from '../../src/utils/test-data';

test.describe('Authentication Suite', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TC-AUTH-01: Should login successfully with standard user', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.login(TestUsers.standard.username, TestUsers.standard.password);

    await expect(inventoryPage.pageTitle).toBeVisible();
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

  test('TC-AUTH-02: Should show error when user is locked out', async ({ loginPage }) => {
    await loginPage.login(TestUsers.lockedOut.username, TestUsers.lockedOut.password);

    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
  });

  test('TC-AUTH-03: Should reject invalid credentials', async ({ loginPage }) => {
    await loginPage.login(TestUsers.invalid.username, TestUsers.invalid.password);

    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Username and password do not match any user in this service');
  });

  test('TC-AUTH-04: Should logout successfully and redirect to login page', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.login(TestUsers.standard.username, TestUsers.standard.password);
    await inventoryPage.header.logout();

    await expect(loginPage.loginButton).toBeVisible();
    expect(loginPage.getUrl()).toBe('https://www.saucedemo.com/');
  });
});
