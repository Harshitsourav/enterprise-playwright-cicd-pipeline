import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { HeaderComponent } from "../components/header.component";

/**
 * Page Object for SauceDemo Products/Inventory Page
 */
export class InventoryPage extends BasePage {
  readonly header: HeaderComponent;
  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.pageTitle = page.locator(".title");
    this.inventoryItems = page.locator(".inventory_item");
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async isLoaded(): Promise<boolean> {
    return (
      (await this.isVisible(this.pageTitle)) &&
      (await this.getText(this.pageTitle)) === "Products"
    );
  }

  async addItemToCart(productName: string): Promise<void> {
    const itemContainer = this.page.locator(".inventory_item", {
      has: this.page.locator(".inventory_item_name", { hasText: productName }),
    });
    const addToCartBtn = itemContainer.locator(
      'button:has-text("Add to cart")',
    );
    await this.click(addToCartBtn, `Add to Cart for "${productName}"`);
  }

  async removeItemFromCart(productName: string): Promise<void> {
    const itemContainer = this.page.locator(".inventory_item", {
      has: this.page.locator(".inventory_item_name", { hasText: productName }),
    });
    const removeBtn = itemContainer.locator('button:has-text("Remove")');
    await this.click(removeBtn, `Remove from Cart for "${productName}"`);
  }

  async selectSortOption(
    optionValue: "az" | "za" | "lohi" | "hilo",
  ): Promise<void> {
    await this.sortDropdown.selectOption(optionValue);
  }

  async getAllProductNames(): Promise<string[]> {
    return await this.page.locator(".inventory_item_name").allInnerTexts();
  }

  async getAllProductPrices(): Promise<number[]> {
    const priceTexts = await this.page
      .locator(".inventory_item_price")
      .allInnerTexts();
    return priceTexts.map((price) => parseFloat(price.replace("$", "")));
  }
}
