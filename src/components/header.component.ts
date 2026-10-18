import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/base.page';

/**
 * Reusable Header Component present across application pages
 */
export class HeaderComponent extends BasePage {
  readonly menuButton: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async openCart(): Promise<void> {
    await this.click(this.shoppingCartLink, 'Shopping Cart Icon');
  }

  async getCartCount(): Promise<number> {
    if (await this.isVisible(this.shoppingCartBadge, 2000)) {
      const count = await this.getText(this.shoppingCartBadge);
      return parseInt(count, 10);
    }
    return 0;
  }

  async logout(): Promise<void> {
    await this.click(this.menuButton, 'Burger Menu Button');
    await this.click(this.logoutLink, 'Logout link');
  }
}
