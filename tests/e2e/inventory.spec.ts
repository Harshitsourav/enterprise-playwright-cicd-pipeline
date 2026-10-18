import { test, expect } from '../../src/fixtures/test.fixture';
import { Products } from '../../src/utils/test-data';

test.describe('Inventory & Catalog Suite', () => {
  test('TC-INV-01: Should display all products on landing', async ({ authenticatedUser }) => {
    const { inventoryPage } = authenticatedUser;
    const names = await inventoryPage.getAllProductNames();

    expect(names.length).toBeGreaterThan(0);
    expect(names).toContain(Products.backpack);
  });

  test('TC-INV-02: Should update cart badge when items are added and removed', async ({
    authenticatedUser,
  }) => {
    const { inventoryPage } = authenticatedUser;

    await inventoryPage.addItemToCart(Products.backpack);
    expect(await inventoryPage.header.getCartCount()).toBe(1);

    await inventoryPage.addItemToCart(Products.bikeLight);
    expect(await inventoryPage.header.getCartCount()).toBe(2);

    await inventoryPage.removeItemFromCart(Products.backpack);
    expect(await inventoryPage.header.getCartCount()).toBe(1);
  });

  test('TC-INV-03: Should sort products by Price (low to high)', async ({ authenticatedUser }) => {
    const { inventoryPage } = authenticatedUser;

    await inventoryPage.selectSortOption('lohi');
    const prices = await inventoryPage.getAllProductPrices();

    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });
});
