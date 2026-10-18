import { test, expect } from "../../src/fixtures/test.fixture";
import { Products, CheckoutInfo } from "../../src/utils/test-data";

test.describe("End-to-End Checkout Suite", () => {
  test("TC-CHK-01: Should complete a full purchase workflow successfully", async ({
    authenticatedUser,
    cartPage,
    checkoutPage,
  }) => {
    const { inventoryPage } = authenticatedUser;

    // 1. Add product to cart
    await inventoryPage.addItemToCart(Products.backpack);
    await inventoryPage.header.openCart();

    // 2. Validate Cart
    const items = await cartPage.getCartItemNames();
    expect(items).toContain(Products.backpack);
    await cartPage.proceedToCheckout();

    // 3. Step 1: Customer Information
    await checkoutPage.fillInformation(
      CheckoutInfo.validCustomer.firstName,
      CheckoutInfo.validCustomer.lastName,
      CheckoutInfo.validCustomer.postalCode,
    );

    // 4. Step 2: Overview & Finish
    await expect(checkoutPage.summaryTotal).toBeVisible();
    await checkoutPage.finishCheckout();

    // 5. Assert confirmation
    const confirmation = await checkoutPage.getConfirmationMessage();
    expect(confirmation).toBe("Thank you for your order!");
  });

  test("TC-CHK-02: Should validate required postal code field", async ({
    authenticatedUser,
    cartPage,
    checkoutPage,
  }) => {
    const { inventoryPage } = authenticatedUser;

    await inventoryPage.addItemToCart(Products.bikeLight);
    await inventoryPage.header.openCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillInformation(
      CheckoutInfo.missingPostal.firstName,
      CheckoutInfo.missingPostal.lastName,
      CheckoutInfo.missingPostal.postalCode,
    );

    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain("Error: Postal Code is required");
  });
});
