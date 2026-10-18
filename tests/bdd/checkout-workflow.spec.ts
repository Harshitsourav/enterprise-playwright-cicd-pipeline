import { test, expect } from "../../src/fixtures/test.fixture";
import { TestUsers, Products, CheckoutInfo } from "../../src/utils/test-data";

test.describe("BDD Feature: Customer Order Checkout", () => {
  /**
   * Scenario: Successful product purchase from catalog to receipt
   *   Given the user is logged into the SauceDemo store
   *   When they add a product to the cart
   *   And proceed to checkout with valid details
   *   Then they should receive an order confirmation
   */
  test("Scenario: Successful product purchase from catalog to receipt", async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await test.step("Given the user is logged into the SauceDemo store", async () => {
      await loginPage.goto();
      await loginPage.login(
        TestUsers.standard.username,
        TestUsers.standard.password,
      );
      await expect(inventoryPage.pageTitle).toHaveText("Products");
    });

    await test.step("When they add a product to the cart", async () => {
      await inventoryPage.addItemToCart(Products.boltTShirt);
      expect(await inventoryPage.header.getCartCount()).toBe(1);
    });

    await test.step("And proceed to checkout with valid details", async () => {
      await inventoryPage.header.openCart();
      await cartPage.proceedToCheckout();
      await checkoutPage.fillInformation(
        CheckoutInfo.validCustomer.firstName,
        CheckoutInfo.validCustomer.lastName,
        CheckoutInfo.validCustomer.postalCode,
      );
      await checkoutPage.finishCheckout();
    });

    await test.step("Then they should receive an order confirmation", async () => {
      const message = await checkoutPage.getConfirmationMessage();
      expect(message).toBe("Thank you for your order!");
    });
  });
});
