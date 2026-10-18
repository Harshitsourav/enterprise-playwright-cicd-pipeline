import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';

/**
 * Page Object for SauceDemo Shopping Cart Page
 */
export class CartPage extends BasePage {
  readonly header: HeaderComponent;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async proceedToCheckout(): Promise<void> {
    await this.click(this.checkoutButton, 'Checkout Button');
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allInnerTexts();
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }
}
